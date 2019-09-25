import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mealinfo',
  templateUrl: './mealinfo.page.html',
  styleUrls: ['./mealinfo.page.scss'],
})
export class MealinfoPage implements OnInit {
  meal: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((res)=>{
      console.log(res);
      this.meal = res;
  });
  }

}
