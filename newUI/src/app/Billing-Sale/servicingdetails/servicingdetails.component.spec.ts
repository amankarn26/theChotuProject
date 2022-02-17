import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicingdetailsComponent } from './servicingdetails.component';

describe('ServicingdetailsComponent', () => {
  let component: ServicingdetailsComponent;
  let fixture: ComponentFixture<ServicingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
