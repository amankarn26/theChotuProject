import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdpropertyComponent } from './prodproperty.component';

describe('ProdpropertyComponent', () => {
  let component: ProdpropertyComponent;
  let fixture: ComponentFixture<ProdpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
