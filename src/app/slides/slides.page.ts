import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {StorageService } from '../../services/storage.service';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  profile={}
  userid: any;
  constructor(private storageService: StorageService, 
    private st: Storage,
    private navCtrl: NavController,
    private authService: AuthService) { 
    
    
  }

  ngOnInit() {
  }

  createprofile(){
    this.st.get('regid').then(value=>{
       console.log(value);
        console.log(this.profile);
       const attempt = this.authService.createprofile(this.profile, value);
      attempt.subscribe(res=>{
        if(res){
          this.navCtrl.navigateRoot('');
        }
      })
    })
     
    //console.log(userid);
  }
  
   

}
