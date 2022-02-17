import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliverypoolOrdersPage } from './deliverypool-orders.page';

describe('DeliverypoolOrdersPage', () => {
  let component: DeliverypoolOrdersPage;
  let fixture: ComponentFixture<DeliverypoolOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverypoolOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverypoolOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
