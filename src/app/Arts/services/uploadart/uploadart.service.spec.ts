import { TestBed } from '@angular/core/testing';

import { UploadartService } from './uploadart.service';

describe('UploadartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadartService = TestBed.get(UploadartService);
    expect(service).toBeTruthy();
  });
});
