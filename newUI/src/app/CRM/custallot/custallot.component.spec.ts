import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustallotComponent } from './custallot.component';

describe('CustallotComponent', () => {
  let component: CustallotComponent;
  let fixture: ComponentFixture<CustallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
