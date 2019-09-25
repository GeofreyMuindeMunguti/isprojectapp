import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealinfoPage } from './mealinfo.page';

describe('MealinfoPage', () => {
  let component: MealinfoPage;
  let fixture: ComponentFixture<MealinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
