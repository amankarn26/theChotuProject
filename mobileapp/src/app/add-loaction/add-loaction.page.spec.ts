import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLoactionPage } from './add-loaction.page';

describe('AddLoactionPage', () => {
  let component: AddLoactionPage;
  let fixture: ComponentFixture<AddLoactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLoactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLoactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
