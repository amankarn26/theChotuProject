import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelrateComponent } from './travelrate.component';

describe('TravelrateComponent', () => {
  let component: TravelrateComponent;
  let fixture: ComponentFixture<TravelrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
