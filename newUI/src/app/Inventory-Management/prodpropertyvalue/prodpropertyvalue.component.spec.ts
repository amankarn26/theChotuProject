import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdpropertyvalueComponent } from './prodpropertyvalue.component';

describe('ProdpropertyvalueComponent', () => {
  let component: ProdpropertyvalueComponent;
  let fixture: ComponentFixture<ProdpropertyvalueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdpropertyvalueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdpropertyvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
