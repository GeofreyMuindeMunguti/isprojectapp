import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {IonSlides, NavController} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { NavComponent } from '@ionic/core';
//import { read } from 'fs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 opts: {
   
    static: true;
};

  @ViewChild('slides', {static: true }) slides: IonSlides;

   
  constructor(private statusBar: StatusBar,
     private navCtrl: NavController,
     private storage: Storage) { 
  }
  ionViewDidLoad() {
    if (!this.statusBar.isVisible) {
        this.statusBar.show();
        this.statusBar.backgroundColorByHexString('#FF8C00');
    }
    this.statusBar.overlaysWebView(true);


}
  ngOnInit() {
 
 
  }
   

  
  lastSlide(){
     
     document.getElementById("login").style.background="";
     document.getElementById("login").style.boxShadow="";
      
     document.getElementById("signup").style.background="#ffffff";
      

  }
  firstSlide(){
   
    document.getElementById("signup").style.background="";
     document.getElementById("signup").style.boxShadow="";
      
     document.getElementById("login").style.background="#ffffff";
     
  }
  logintab(){
   // console.log("clicked login")
    this.slides.slidePrev();

  }
  registertab(){
    //console.log("clicked register")
   this.slides.slideNext();

  }
  login(){
    this.navCtrl.navigateRoot('');
    this.storage.set('authenticated', 'true');
  }
}

