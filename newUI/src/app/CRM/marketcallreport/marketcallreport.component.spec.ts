import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketcallreportComponent } from './marketcallreport.component';

describe('MarketcallreportComponent', () => {
  let component: MarketcallreportComponent;
  let fixture: ComponentFixture<MarketcallreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketcallreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketcallreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
