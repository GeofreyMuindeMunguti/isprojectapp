import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { LoginPage } from './login/login.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer/ngx';
import { StorageService } from '../../src/services/storage.service';
import { Health } from '@ionic-native/health/ngx';
 
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private navctrl: NavController,
    private storage: Storage,
    private statusBar: StatusBar,
    private pedometer: Pedometer,
    private storageService: StorageService,
    private health: Health,
    private backgroundMode: BackgroundMode,
   // private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.platform.ready (). then (() => {
      this.backgroundMode.enable();
      this.getdistance();

      this.backgroundMode.on("activate").subscribe(()=>{
        this.getdistance();
        this.storageService.presentToast("running");
      });
    });
  
    
  }
  ionViewDidLoad() {
    if (!this.statusBar.isVisible) {
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#cc6600');
        this.backgroundMode.enable();
        this.backgroundMode.on("activate").subscribe(()=>{
          this.getdistance();
          this.storageService.presentToast("running");
        });
    }
    this.statusBar.overlaysWebView(true);
    
}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#cc6600.');
      this.splashScreen.hide();
      
     //this.storage.set('fingerprint', 'true');
      
      this.storage.get('authenticated').then((auth) =>{
        if(auth){
         this.checksettings();
         //this.storageService.presentToast("auth")
        }
        else{
        this.navctrl.navigateRoot('/login')
        //this.storageService.presentToast("no auth")
        }
      })
     
    });
  }
  checksettings(){
    this.storage.get('fingerprint').then(setting =>
      {console.log(setting);
        if(setting){
          this.navctrl.navigateRoot('')
        }
        else{
          this.navctrl.navigateRoot('')
        }
      })
  }
  openProfile(){
    this.navctrl.navigateBack('/profile');
  }
  openTabs(){
    this.navctrl.navigateBack('')
  }

  getdistance(){
  this.pedometer.isDistanceAvailable()
  .then((available: boolean) => {console.log(available)
  })
  .catch((error: any) => {console.log(error)
  this.pedometer.startPedometerUpdates()
   .subscribe((data: IPedometerData) => {
     //this.storageService.presentToast("Distance"+data.numberOfSteps);
   });
  });
}
}

