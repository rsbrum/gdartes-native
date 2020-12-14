import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadImageComponent } from './load-image.component';

describe('LoadImageComponent', () => {
  let component: LoadImageComponent;
  let fixture: ComponentFixture<LoadImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadImageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
