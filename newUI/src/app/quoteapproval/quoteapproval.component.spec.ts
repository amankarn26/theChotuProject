import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteapprovalComponent } from './quoteapproval.component';

describe('QuoteapprovalComponent', () => {
  let component: QuoteapprovalComponent;
  let fixture: ComponentFixture<QuoteapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
