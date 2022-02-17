import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllmenutypePage } from './allmenutype.page';

describe('AllmenutypePage', () => {
  let component: AllmenutypePage;
  let fixture: ComponentFixture<AllmenutypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllmenutypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllmenutypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
