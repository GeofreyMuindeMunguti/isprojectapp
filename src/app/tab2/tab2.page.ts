import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  meals = [{"name":"Meal 1"},{"name":"Meal 2"},{"name":"Meal 3"}];

  constructor() {}

}
