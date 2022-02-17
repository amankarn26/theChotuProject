import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliverypoolHomePage } from './deliverypool-home.page';

describe('DeliverypoolHomePage', () => {
  let component: DeliverypoolHomePage;
  let fixture: ComponentFixture<DeliverypoolHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverypoolHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverypoolHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
