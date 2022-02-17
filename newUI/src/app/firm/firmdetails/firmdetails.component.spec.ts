import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmdetailsComponent } from './firmdetails.component';

describe('FirmdetailsComponent', () => {
  let component: FirmdetailsComponent;
  let fixture: ComponentFixture<FirmdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
