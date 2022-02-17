import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendpageComponent } from './vendpage.component';

describe('VendpageComponent', () => {
  let component: VendpageComponent;
  let fixture: ComponentFixture<VendpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
