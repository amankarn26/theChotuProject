import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackingpendingComponent } from './packingpending.component';

describe('PackingpendingComponent', () => {
  let component: PackingpendingComponent;
  let fixture: ComponentFixture<PackingpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackingpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackingpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
