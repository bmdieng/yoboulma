import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCreerLivreurPage } from './modal-creer-livreur.page';

describe('ModalCreerLivreurPage', () => {
  let component: ModalCreerLivreurPage;
  let fixture: ComponentFixture<ModalCreerLivreurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreerLivreurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCreerLivreurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
