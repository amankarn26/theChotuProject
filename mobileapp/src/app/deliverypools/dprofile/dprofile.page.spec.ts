import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DprofilePage } from './dprofile.page';

describe('DprofilePage', () => {
  let component: DprofilePage;
  let fixture: ComponentFixture<DprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
