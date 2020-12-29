import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailAnnonceurPage } from './detail-annonceur.page';

describe('DetailAnnonceurPage', () => {
  let component: DetailAnnonceurPage;
  let fixture: ComponentFixture<DetailAnnonceurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAnnonceurPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailAnnonceurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
