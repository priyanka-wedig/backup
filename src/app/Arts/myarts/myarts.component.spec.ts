import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyartsComponent } from './myarts.component';

describe('MyartsComponent', () => {
  let component: MyartsComponent;
  let fixture: ComponentFixture<MyartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
