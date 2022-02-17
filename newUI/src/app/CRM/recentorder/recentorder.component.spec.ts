import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentorderComponent } from './recentorder.component';

describe('RecentorderComponent', () => {
  let component: RecentorderComponent;
  let fixture: ComponentFixture<RecentorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
