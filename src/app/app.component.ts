import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { LoginPage } from './login/login.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

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
   // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }
  ionViewDidLoad() {
    if (!this.statusBar.isVisible) {
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#cc6600');
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
        }
        else{
        this.navctrl.navigateRoot('/login')
        }
      })
     
    });
  }
  checksettings(){
    this.storage.get('fingerprint').then(setting =>
      {console.log(setting);
        if(setting){
          this.navctrl.navigateRoot('/fingerprint')
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

}

