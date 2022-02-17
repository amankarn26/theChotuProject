import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallwindowComponent } from './callwindow.component';

describe('CallwindowComponent', () => {
  let component: CallwindowComponent;
  let fixture: ComponentFixture<CallwindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallwindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
