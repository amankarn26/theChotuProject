import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypoolareaComponent } from './deliverypoolarea.component';

describe('DeliverypoolareaComponent', () => {
  let component: DeliverypoolareaComponent;
  let fixture: ComponentFixture<DeliverypoolareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverypoolareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverypoolareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
