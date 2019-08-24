import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  meals = [{"name":"Meal 1"},{"name":"Meal 2"},{"name":"Meal 3"}];
  constructor(private statusBar: StatusBar) {}
  ionViewDidLoad() {
    if (!this.statusBar.isVisible) {
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#20059C');
    }
    this.statusBar.overlaysWebView(true);
  
  
  }

}
