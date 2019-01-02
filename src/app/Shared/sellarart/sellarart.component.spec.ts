import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellarartComponent } from './sellarart.component';

describe('SellarartComponent', () => {
  let component: SellarartComponent;
  let fixture: ComponentFixture<SellarartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellarartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellarartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
