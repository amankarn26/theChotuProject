import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewdishPage } from './reviewdish.page';

describe('ReviewdishPage', () => {
  let component: ReviewdishPage;
  let fixture: ComponentFixture<ReviewdishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewdishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewdishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
