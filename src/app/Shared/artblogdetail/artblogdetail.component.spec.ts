import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtblogdetailComponent } from './artblogdetail.component';

describe('ArtblogdetailComponent', () => {
  let component: ArtblogdetailComponent;
  let fixture: ComponentFixture<ArtblogdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtblogdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtblogdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
