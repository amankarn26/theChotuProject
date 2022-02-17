import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyscreensComponent } from './dummyscreens.component';

describe('DummyscreensComponent', () => {
  let component: DummyscreensComponent;
  let fixture: ComponentFixture<DummyscreensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyscreensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyscreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
