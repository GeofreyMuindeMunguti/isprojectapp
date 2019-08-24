import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor( private navCtrl: NavController, private statusBar: StatusBar) {
}
ionViewDidLoad() {
  if (!this.statusBar.isVisible) {
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#4c8dff');
  }
  this.statusBar.overlaysWebView(true);


}

 
}
