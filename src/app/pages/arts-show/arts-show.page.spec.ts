import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArtsShowPage } from './arts-show.page';

describe('ArtsShowPage', () => {
  let component: ArtsShowPage;
  let fixture: ComponentFixture<ArtsShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtsShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArtsShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
