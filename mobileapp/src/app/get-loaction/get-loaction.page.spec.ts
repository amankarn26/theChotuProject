import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetLoactionPage } from './get-loaction.page';

describe('GetLoactionPage', () => {
  let component: GetLoactionPage;
  let fixture: ComponentFixture<GetLoactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetLoactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetLoactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
