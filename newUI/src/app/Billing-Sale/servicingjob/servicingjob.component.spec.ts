import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicingjobComponent } from './servicingjob.component';

describe('ServicingjobComponent', () => {
  let component: ServicingjobComponent;
  let fixture: ComponentFixture<ServicingjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicingjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicingjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
