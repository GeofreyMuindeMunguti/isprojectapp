import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular';
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

   lgvalue: any;
   savalue: any;


  constructor() { }

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
}

