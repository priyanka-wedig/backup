import { TestBed } from '@angular/core/testing';

import { AwsUtil } from './aws.service';

describe('AwsUtil', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsUtil = TestBed.get(AwsUtil);
    expect(service).toBeTruthy();
  });
});
