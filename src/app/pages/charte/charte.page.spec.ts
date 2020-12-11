import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChartePage } from './charte.page';

describe('ChartePage', () => {
  let component: ChartePage;
  let fixture: ComponentFixture<ChartePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
