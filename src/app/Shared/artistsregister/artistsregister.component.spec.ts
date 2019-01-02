import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsregisterComponent } from './artistsregister.component';

describe('ArtistsregisterComponent', () => {
  let component: ArtistsregisterComponent;
  let fixture: ComponentFixture<ArtistsregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistsregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
