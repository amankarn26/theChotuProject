import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverychargesComponent } from './deliverycharges.component';

describe('DeliverychargesComponent', () => {
  let component: DeliverychargesComponent;
  let fixture: ComponentFixture<DeliverychargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverychargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverychargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
