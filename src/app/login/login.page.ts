import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';
import {AlertController} from '@ionic/angular';


//import { read } from 'fs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
 
 user = {}
 reg ={}

 opts: {
   
    static: true;
};

  @ViewChild('slides', {static: true }) slides: IonSlides;

   
  constructor(private statusBar: StatusBar,
     private navCtrl: NavController,
     private storageService: StorageService,
     private authService: AuthService,
     private alertCtrl: AlertController,) { 
  }
  ionViewDidLoad() {
    if (!this.statusBar.isVisible) {
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#cc6600');
    }
    this.statusBar.overlaysWebView(true);


}
  ngOnInit() {
 
 
  }
   

  
  lastSlide(){
     
     document.getElementById("login").style.background="";
     document.getElementById("login").style.boxShadow="";
      
     document.getElementById("signup").style.background="#ffffff";
      

  }
  firstSlide(){
   
    document.getElementById("signup").style.background="";
     document.getElementById("signup").style.boxShadow="";
      
     document.getElementById("login").style.background="#ffffff";
     
  }
  logintab(){
   // console.log("clicked login")
    this.slides.slidePrev();

  }
  registertab(){
    //console.log("clicked register")
   this.slides.slideNext();

  }
  login(){
   // console.log(this.user); debugging...
    const loginattempt = this.authService.authenticate(this.user);
    loginattempt.subscribe(data=>{
      //const user = data;
      if(data){
        console.log(data)
        this.redirecthome(data);
      }
    })

    
  }

  async register(){
    this.authService.register(this.reg).subscribe(data=>{
      if(data){
          this.storageService.presentToast("Verifying...");
          this.presentAlertPrompt(data);
      }
    })
    

  }
  async presentAlertPrompt(userdata) {
    const alert = await this.alertCtrl.create({
      header: 'Hey '+ userdata.name,
      message: 'Please enter the  <strong>code </strong> sent to your email to finalise your account set up!!',
      inputs: [
        {
          name: 'code',
          type: 'number',
          placeholder: 'Enter code'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.authService.remove(userdata._id);
            this.navCtrl.navigateRoot('/login');
            this.storageService.presentToast("Registration aborted..");
          }
        }, {
          text: 'Ok',
          handler: (user) => {
           const response = this.authService.confirm(userdata, user.code);
           if(response){
             console.log("created");
             this.storageService.presentToast("Registration successful..");
             this.storageService.store('regid', userdata._id);
             this.navCtrl.navigateRoot(['/slides'],{queryParams:{data:userdata._id}});
           }
          }
        }
      ]
    });

    await alert.present();
  }

  redirecthome(data){
       this.storageService.store("profile", data);
       this.storageService.store("authenticated",true);
       this.navCtrl.navigateRoot('');
  }

}

