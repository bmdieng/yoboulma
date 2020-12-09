import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailLivreurPage } from './detail-livreur.page';

describe('DetailLivreurPage', () => {
  let component: DetailLivreurPage;
  let fixture: ComponentFixture<DetailLivreurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailLivreurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailLivreurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
