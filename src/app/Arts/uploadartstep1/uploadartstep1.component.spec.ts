import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadartstep1Component } from './uploadartstep1.component';

describe('Uploadartstep1Component', () => {
  let component: Uploadartstep1Component;
  let fixture: ComponentFixture<Uploadartstep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Uploadartstep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uploadartstep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
