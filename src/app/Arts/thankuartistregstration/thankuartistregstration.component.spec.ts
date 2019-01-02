import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankuartistregstrationComponent } from './thankuartistregstration.component';

describe('ThankuartistregstrationComponent', () => {
  let component: ThankuartistregstrationComponent;
  let fixture: ComponentFixture<ThankuartistregstrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThankuartistregstrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankuartistregstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
