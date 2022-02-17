import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorordersComponent } from './vendororders.component';

describe('VendorordersComponent', () => {
  let component: VendorordersComponent;
  let fixture: ComponentFixture<VendorordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
