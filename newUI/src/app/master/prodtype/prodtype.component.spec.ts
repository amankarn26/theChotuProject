import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdtypeComponent } from './prodtype.component';

describe('ProdtypeComponent', () => {
  let component: ProdtypeComponent;
  let fixture: ComponentFixture<ProdtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
