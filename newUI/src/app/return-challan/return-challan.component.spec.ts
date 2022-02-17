import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnChallanComponent } from './return-challan.component';

describe('ReturnChallanComponent', () => {
  let component: ReturnChallanComponent;
  let fixture: ComponentFixture<ReturnChallanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnChallanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
