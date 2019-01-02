import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadartstep4Component } from './uploadartstep4.component';

describe('Uploadartstep4Component', () => {
  let component: Uploadartstep4Component;
  let fixture: ComponentFixture<Uploadartstep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Uploadartstep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uploadartstep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
