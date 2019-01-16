import { TestBed } from '@angular/core/testing';

import { CognitoUtil } from './congnito.service';

describe('CognitoUtil', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CognitoUtil = TestBed.get(CognitoUtil);
    expect(service).toBeTruthy();
  });
});
