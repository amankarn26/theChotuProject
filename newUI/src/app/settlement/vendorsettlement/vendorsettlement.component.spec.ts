import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsettlementComponent } from './vendorsettlement.component';

describe('VendorsettlementComponent', () => {
  let component: VendorsettlementComponent;
  let fixture: ComponentFixture<VendorsettlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsettlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
