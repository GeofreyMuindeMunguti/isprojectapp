import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  meals = [{"name":"Meal 1"},{"name":"Meal 2"},{"name":"Meal 3"}];
  constructor() {}

}
