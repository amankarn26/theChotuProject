import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailquoteComponent } from './detailquote.component';

describe('DetailquoteComponent', () => {
  let component: DetailquoteComponent;
  let fixture: ComponentFixture<DetailquoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailquoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
