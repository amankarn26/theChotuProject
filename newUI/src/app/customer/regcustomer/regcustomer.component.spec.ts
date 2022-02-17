import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegcustomerComponent } from './regcustomer.component';

describe('RegcustomerComponent', () => {
  let component: RegcustomerComponent;
  let fixture: ComponentFixture<RegcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
