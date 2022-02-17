import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RlabelComponent } from './rlabel.component';

describe('RlabelComponent', () => {
  let component: RlabelComponent;
  let fixture: ComponentFixture<RlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
