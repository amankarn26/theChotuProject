import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VprofilePage } from './vprofile.page';

describe('VprofilePage', () => {
  let component: VprofilePage;
  let fixture: ComponentFixture<VprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
