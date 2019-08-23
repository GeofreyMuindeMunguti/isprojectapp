import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { LoginPage } from './login/login.page';
//import { StatusBar } from '@ionic-native/status-bar';
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
    //private statusBar: StatusBar,
   // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
     // this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.storage.get('profile').then((profile) =>{
        if(profile){
          this.navctrl.navigateRoot('')
        }
        this.navctrl.navigateRoot('/login')
      })
     
    });
  }
}
