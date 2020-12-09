import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonProfilePage } from './mon-profile.page';

describe('MonProfilePage', () => {
  let component: MonProfilePage;
  let fixture: ComponentFixture<MonProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
