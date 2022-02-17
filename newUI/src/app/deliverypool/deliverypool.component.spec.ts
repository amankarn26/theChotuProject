import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypoolComponent } from './deliverypool.component';

describe('DeliverypoolComponent', () => {
  let component: DeliverypoolComponent;
  let fixture: ComponentFixture<DeliverypoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverypoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverypoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
