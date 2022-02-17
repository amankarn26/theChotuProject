import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountpayableComponent } from './amountpayable.component';

describe('AmountpayableComponent', () => {
  let component: AmountpayableComponent;
  let fixture: ComponentFixture<AmountpayableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountpayableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountpayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
