import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllvendorsPage } from './allvendors.page';

describe('AllvendorsPage', () => {
  let component: AllvendorsPage;
  let fixture: ComponentFixture<AllvendorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllvendorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllvendorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
