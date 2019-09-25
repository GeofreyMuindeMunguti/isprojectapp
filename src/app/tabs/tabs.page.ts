import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor( private navCtrl: NavController, 
    private statusBar: StatusBar,
    private pedometer : Pedometer
    ) {
}
ionViewDidLoad() {
  if (!this.statusBar.isVisible) {
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString('#cc6600');
  }
  this.statusBar.overlaysWebView(true);

 
  
}

 
}
