import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledordersComponent } from './cancelledorders.component';

describe('CancelledordersComponent', () => {
  let component: CancelledordersComponent;
  let fixture: ComponentFixture<CancelledordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelledordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
