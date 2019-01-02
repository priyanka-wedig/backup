import { TestBed } from '@angular/core/testing';

import { SellartService } from './sellart.service';

describe('SellartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellartService = TestBed.get(SellartService);
    expect(service).toBeTruthy();
  });
});
