import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublierAnnoncePage } from './publier-annonce.page';

describe('PublierAnnoncePage', () => {
  let component: PublierAnnoncePage;
  let fixture: ComponentFixture<PublierAnnoncePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublierAnnoncePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublierAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
