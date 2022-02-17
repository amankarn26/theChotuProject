import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderinwardComponent } from './purchaseorderinward.component';

describe('PurchaseorderinwardComponent', () => {
  let component: PurchaseorderinwardComponent;
  let fixture: ComponentFixture<PurchaseorderinwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseorderinwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderinwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
