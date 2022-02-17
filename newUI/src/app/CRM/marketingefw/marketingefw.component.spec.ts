import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingefwComponent } from './marketingefw.component';

describe('MarketingefwComponent', () => {
  let component: MarketingefwComponent;
  let fixture: ComponentFixture<MarketingefwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingefwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingefwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
