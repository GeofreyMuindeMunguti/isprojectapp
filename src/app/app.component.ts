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
        this.statusBar.backgroundColorByHexString('#20059C');
    }
    this.statusBar.overlaysWebView(true);


}
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#20059C');
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

