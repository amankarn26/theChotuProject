import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverysettlementComponent } from './deliverysettlement.component';

describe('DeliverysettlementComponent', () => {
  let component: DeliverysettlementComponent;
  let fixture: ComponentFixture<DeliverysettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverysettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverysettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
