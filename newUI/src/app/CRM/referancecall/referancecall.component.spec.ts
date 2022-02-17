import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferancecallComponent } from './referancecall.component';

describe('ReferancecallComponent', () => {
  let component: ReferancecallComponent;
  let fixture: ComponentFixture<ReferancecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferancecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferancecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
