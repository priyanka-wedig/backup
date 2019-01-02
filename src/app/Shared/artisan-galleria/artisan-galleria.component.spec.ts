import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanGalleriaComponent } from './artisan-galleria.component';

describe('ArtisanGalleriaComponent', () => {
  let component: ArtisanGalleriaComponent;
  let fixture: ComponentFixture<ArtisanGalleriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtisanGalleriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanGalleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
