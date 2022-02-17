import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountpayabledeliveryComponent } from './amountpayabledelivery.component';

describe('AmountpayabledeliveryComponent', () => {
  let component: AmountpayabledeliveryComponent;
  let fixture: ComponentFixture<AmountpayabledeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountpayabledeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountpayabledeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
