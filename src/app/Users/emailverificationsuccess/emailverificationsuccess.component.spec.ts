import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailverificationsuccessComponent } from './emailverificationsuccess.component';

describe('EmailverificationsuccessComponent', () => {
  let component: EmailverificationsuccessComponent;
  let fixture: ComponentFixture<EmailverificationsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailverificationsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailverificationsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
