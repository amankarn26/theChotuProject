import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerhomepageComponent } from './customerhomepage.component';

describe('CustomerhomepageComponent', () => {
  let component: CustomerhomepageComponent;
  let fixture: ComponentFixture<CustomerhomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerhomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
