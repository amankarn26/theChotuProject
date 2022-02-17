import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelsettlementComponent } from './cancelsettlement.component';

describe('CancelsettlementComponent', () => {
  let component: CancelsettlementComponent;
  let fixture: ComponentFixture<CancelsettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelsettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelsettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
