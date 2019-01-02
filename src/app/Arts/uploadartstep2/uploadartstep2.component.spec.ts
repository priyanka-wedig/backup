import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadartstep2Component } from './uploadartstep2.component';

describe('Uploadartstep2Component', () => {
  let component: Uploadartstep2Component;
  let fixture: ComponentFixture<Uploadartstep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Uploadartstep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uploadartstep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
