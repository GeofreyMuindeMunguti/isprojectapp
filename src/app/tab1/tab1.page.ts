import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from '../../services/auth.service';
import {StorageService} from '../../services/storage.service';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Health } from '@ionic-native/health/ngx';

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
              private navCtrl: NavController,
              private health: Health

    ) {
      this.getMeals();
    }
  ionViewDidLoad() {
    if (!this.statusBar.isVisible) {
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#cc6600');
    }
    this.statusBar.overlaysWebView(true);
    this.healthdata();
     
  
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

  healthdata(){
    this.health.isAvailable()
    .then((available:boolean) => {
      console.log(available);
      this.health.requestAuthorization([
        'distance', 'nutrition',  //read and write permissions
        {
          read: ['steps'],       //read only permission
          write: ['height', 'weight']  //write only permission
        }
      ])
      .then(res => console.log(res))
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  
  }

  like(id, like){
    console.log(like)
    if(like==undefined){
      like = 0;
    }
    const payload ={
      likes : like+1,
    }
    console.log(payload)
    this.mealsService.likemeal(id, payload).subscribe((Response)=>{
      if(Response){
        console.log(Response)
      }
    })
  }
  fav(meal){
    var favs =  []
    var checker = false;
    this.storage.get('favouites').then((data)=>{
      console.log(data);
      if(!data){
        favs.push(meal);
       // console.log(favs);
        this.storage.set('favouites', favs)
      } 
      else{
        favs = data;
        favs.push(meal);
        this.storage.set('favouites', favs)
      }
    })
  }

}
