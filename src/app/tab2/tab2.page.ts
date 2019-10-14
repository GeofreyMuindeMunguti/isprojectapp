import { Component } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  meals :any;

  constructor( private storageServiceStored: Storage,) {
    
  }
  ionViewWillEnter(){
    this.getMeals();
  }
  async getMeals(){
    this.meals = await this.storageServiceStored.get('favouites');
  }
}
