import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AlertButton } from '@ionic/core';
import {AlertController} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {SlidesPage} from '../slides/slides.page';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile :any;
  bmi: any;
  tdee: any;
  totdee: any;
  steps: any;
  constructor( private storageService: Storage,
               private alertCtrl: AlertController,
               private storage: Storage,
               private storageServiceStored: StorageService,
               private authService: AuthService,
               public modalController: ModalController,
               private navCtrl: NavController) { 
    this.storageService.get('profile').then(data=>{
      console.log(data);
      this.profile = data;

      this.bmi = ((this.profile.weight)/(this.profile.height*this.profile.height)).toFixed(2);

      this.tdee = (this.getBMR(this.profile) * 1.25).toFixed(2)
      this.totdee = this.tdee+200;
      
    })
     
  }

 async ngOnInit() {
   
  }
  stepcount(){
    
  }
 getBMR(user){

    const w = user.weight;
    const h = user.height;
    const a = user.age;
    const g = user.gender;
    var BMR;

    if(g == "male"){
          BMR = ((h * 6.25) + (w * 9.99) - (a * 4.92)) + 5;
    }
    if(g == "female"){
     BMR = ((h * 6.25) + (w * 9.99) - (a * 4.92)) - 161;
    }

    return BMR
     
}

  logout(){
    this.storageService.clear().then(cleared=>{
      this.navCtrl.navigateRoot('/login')
    })
  }

  editprofile(){
    this.storage.ready().then(()=>{
     this.storage.get('profile').then((userdata)=>{
       console.log(userdata._id)
       this.showeditalert(userdata);
  })
  })
}

async showeditalert(userdata){
  const alert =  await this.alertCtrl.create({
    header: 'Hey '+ userdata.name,
    message: 'Use this form to edit your profile!!',
    inputs: [
      {  
        name: 'name',
        type: 'text',
        placeholder: 'name',
        value: userdata.name
      },
      {  
        name: 'email',
        type: 'email',
        placeholder: 'email',
        value: userdata.email
      },
      {  
        name: 'weight',
        type: 'number',
        placeholder: 'weight (Kg)',
         
      },
      {  
        name: 'height',
        type: 'number',
        placeholder: 'height (M)',
        
      },
      {  
        name: 'age',
        type: 'number',
        placeholder: 'age (Yrs)',
         
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
         // this.authService.remove(userdata._id);
         // this.navCtrl.navigateRoot('/login');
          //this.storageService.presentToast("Registration aborted..");
        }
      }, {
        text: 'Ok',
        handler: (user) => {
         const response = this.authService.editprofile(user, userdata._id);
         if(response){
           response.subscribe((data)=>{
             console.log(data);
             this.storageServiceStored.store('profile', data)
             this.storageServiceStored.presentToast("Profile edited successfully..");
             this.navCtrl.navigateRoot('/tabs');
           })
           
         }
        }
      }
    ]
  });
  alert.present();
}

 
}
