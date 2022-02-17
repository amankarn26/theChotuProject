import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopularshopPage } from './popularshop.page';

describe('PopularshopPage', () => {
  let component: PopularshopPage;
  let fixture: ComponentFixture<PopularshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularshopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
