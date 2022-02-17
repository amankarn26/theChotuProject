import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleleadComponent } from './salelead.component';

describe('SaleleadComponent', () => {
  let component: SaleleadComponent;
  let fixture: ComponentFixture<SaleleadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleleadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
