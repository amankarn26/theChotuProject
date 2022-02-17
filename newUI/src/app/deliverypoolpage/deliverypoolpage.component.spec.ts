import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverypoolpageComponent } from './deliverypoolpage.component';

describe('DeliverypoolpageComponent', () => {
  let component: DeliverypoolpageComponent;
  let fixture: ComponentFixture<DeliverypoolpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverypoolpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverypoolpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
