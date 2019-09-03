import { Component, OnInit } from '@angular/core';
import { FingerprintOptions, FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import { ToastController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.page.html',
  styleUrls: ['./fingerprint.page.scss'],
})
export class FingerprintPage implements OnInit {
  data = { userName: "" }
  fingerprintOptions : FingerprintOptions;
  constructor(private faio: FingerprintAIO,
    public toastController: ToastController,
    private navctrl: NavController,
    private storage: Storage,
    private platform: Platform) {
       
     }

  ngOnInit() {
     
  }
  ionViewWillEnter(){
   // console.log("checked")
    this.checkauth();
  }

  auth(){
    console.log("reached")

    //this.faio.isAvailable().then(data=> console.log(data));
     
    this.faio.isAvailable()
    .then(result => {
    if(result === "finger" || result === "face"){
      this.faio.show({
        clientId: 'NihinDemoBioAuthApp',
        clientSecret: 'nihinBioAuthDemo', //Only necessary for Android
        disableBackup: true, //Only for Android(optional)
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please Authenticate' //Only for iOS
    })
    .then((result: any) => {
     console.log("Fingerprint available..")
     if(result){
      // this.showtoast("successfully authenticated")
       this.navctrl.navigateRoot('')
      }
     else {
       
      //this.showtoast("Not successfully authenticated")

     }
   })
   .catch((error: any) => {
    navigator['app'].exitApp();
    this.showtoast("exiting app..")
   });
   }
   else {
    // this.showtoast("Fingerprint not available")
    console.log("fingerprint not available..")
     this.navctrl.navigateRoot('');
      }
    })
}

checkauth(){
  this.storage.get('fingerprint').then(data =>
    { if(data){
      console.log('data is available')
       this.auth();
    }
    else{
     this.navctrl.navigateRoot('');
     console.log('Data is not available')
    }
    })
}
   
async showtoast(x){

const toast = await this.toastController.create({
  message: x,
  duration: 2000
});
toast.present();
}

}
