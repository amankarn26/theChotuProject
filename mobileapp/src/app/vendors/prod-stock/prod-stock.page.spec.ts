import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProdStockPage } from './prod-stock.page';

describe('ProdStockPage', () => {
  let component: ProdStockPage;
  let fixture: ComponentFixture<ProdStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdStockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
