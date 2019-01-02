import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadartstep5Component } from './uploadartstep5.component';

describe('Uploadartstep5Component', () => {
  let component: Uploadartstep5Component;
  let fixture: ComponentFixture<Uploadartstep5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Uploadartstep5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uploadartstep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
