import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtgeomapComponent } from './artgeomap.component';

describe('ArtgeomapComponent', () => {
  let component: ArtgeomapComponent;
  let fixture: ComponentFixture<ArtgeomapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtgeomapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtgeomapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
