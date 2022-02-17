import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendcampaignComponent } from './sendcampaign.component';

describe('SendcampaignComponent', () => {
  let component: SendcampaignComponent;
  let fixture: ComponentFixture<SendcampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendcampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendcampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
