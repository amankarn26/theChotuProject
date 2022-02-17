import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatwithdishPage } from './catwithdish.page';

describe('CatwithdishPage', () => {
  let component: CatwithdishPage;
  let fixture: ComponentFixture<CatwithdishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatwithdishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatwithdishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
