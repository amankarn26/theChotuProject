import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorHomePage } from './vendor-home.page';

describe('VendorHomePage', () => {
  let component: VendorHomePage;
  let fixture: ComponentFixture<VendorHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
