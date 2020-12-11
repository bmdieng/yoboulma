import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCreerAnnoncePage } from './modal-creer-annonce.page';

describe('ModalCreerAnnoncePage', () => {
  let component: ModalCreerAnnoncePage;
  let fixture: ComponentFixture<ModalCreerAnnoncePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreerAnnoncePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCreerAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
