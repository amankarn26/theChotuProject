import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatelableComponent } from './ratelable.component';

describe('RatelableComponent', () => {
  let component: RatelableComponent;
  let fixture: ComponentFixture<RatelableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatelableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatelableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
