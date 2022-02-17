import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandcondComponent } from './termsandcond.component';

describe('TermsandcondComponent', () => {
  let component: TermsandcondComponent;
  let fixture: ComponentFixture<TermsandcondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsandcondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsandcondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
