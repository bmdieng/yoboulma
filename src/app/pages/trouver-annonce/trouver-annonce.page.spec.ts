import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrouverAnnoncePage } from './trouver-annonce.page';

describe('TrouverAnnoncePage', () => {
  let component: TrouverAnnoncePage;
  let fixture: ComponentFixture<TrouverAnnoncePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrouverAnnoncePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrouverAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
