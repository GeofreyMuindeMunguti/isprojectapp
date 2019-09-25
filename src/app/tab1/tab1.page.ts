import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  meals :any;
  lunchmeals: Array<Object> = [];

  breakfast: String ="Breakfast"
  lunch:String ="Lunch"
  dinner:String = "Dinner"
  
  sliderConfig = {
    slidesPerView: 1.2,
    spaceBetween: 5,
    centeredSlides: true
  };
 
  constructor(private statusBar: StatusBar,
              private storage: Storage,
              private mealsService: AuthService,
              private navCtrl: NavController

    ) {
      this.getMeals();
    }
  ionViewDidLoad() {
    if (!this.statusBar.isVisible) {
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#cc6600');
    }
    this.statusBar.overlaysWebView(true);
     
  
  
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.getMeals();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getMeals(){
    this.storage.get('profile').then(user=>{
      console.log(user)
      const response = this.mealsService.getMeals(user.email);
      response.subscribe(data=>{
            this.meals = data
            
            
      })
    })
     
  }
  viewMeal(meal){
     this.navCtrl.navigateForward(['/mealinfo'] ,{queryParams:meal})
  }

}
