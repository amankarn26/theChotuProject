import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishreviewsComponent } from './dishreviews.component';

describe('DishreviewsComponent', () => {
  let component: DishreviewsComponent;
  let fixture: ComponentFixture<DishreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
