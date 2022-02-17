import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetcallComponent } from './targetcall.component';

describe('TargetcallComponent', () => {
  let component: TargetcallComponent;
  let fixture: ComponentFixture<TargetcallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetcallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetcallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
