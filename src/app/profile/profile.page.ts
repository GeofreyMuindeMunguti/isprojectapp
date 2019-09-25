import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile :any;
  bmi: any;
  tdee: any;
  totdee: any;
  steps: any;
  constructor( private storageService: Storage,
               private navCtrl: NavController) { 
    this.storageService.get('profile').then(data=>{
      console.log(data);
      this.profile = data;

      this.bmi = ((this.profile.weight)/(this.profile.height*this.profile.height)).toFixed(2);

      this.tdee = (this.getBMR(this.profile) * 1.25).toFixed(2)
      this.totdee = this.tdee+200;
      
    })
     
  }

 async ngOnInit() {
   
  }
  stepcount(){
    
  }
 getBMR(user){

    const w = user.weight;
    const h = user.height;
    const a = user.age;
    const g = user.gender;
    var BMR;

    if(g == "male"){
          BMR = ((h * 6.25) + (w * 9.99) - (a * 4.92)) + 5;
    }
    if(g == "female"){
     BMR = ((h * 6.25) + (w * 9.99) - (a * 4.92)) - 161;
    }

    return BMR
     
}

  logout(){
    this.storageService.clear().then(cleared=>{
      this.navCtrl.navigateRoot('/login')
    })
  }

   
}
