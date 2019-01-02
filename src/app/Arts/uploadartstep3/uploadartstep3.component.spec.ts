import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadartstep3Component } from './uploadartstep3.component';

describe('Uploadartstep3Component', () => {
  let component: Uploadartstep3Component;
  let fixture: ComponentFixture<Uploadartstep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Uploadartstep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uploadartstep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
