import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookvehicleComponent } from './bookvehicle.component';

describe('BookvehicleComponent', () => {
  let component: BookvehicleComponent;
  let fixture: ComponentFixture<BookvehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookvehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
