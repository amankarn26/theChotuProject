import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstockComponent } from './productstock.component';

describe('ProductstockComponent', () => {
  let component: ProductstockComponent;
  let fixture: ComponentFixture<ProductstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
