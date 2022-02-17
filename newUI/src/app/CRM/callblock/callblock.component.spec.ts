import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallblockComponent } from './callblock.component';

describe('CallblockComponent', () => {
  let component: CallblockComponent;
  let fixture: ComponentFixture<CallblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
