import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  meals = [{"name":"Meal 1"},{"name":"Meal 2"},{"name":"Meal 3"}];
  sliderConfig = {
    slidesPerView: 1.2,
    spaceBetween: 5,
    centeredSlides: true
  };
 
  constructor(private statusBar: StatusBar) {}
  ionViewDidLoad() {
    if (!this.statusBar.isVisible) {
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#4c8dff');
    }
    this.statusBar.overlaysWebView(true);
  
  
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
