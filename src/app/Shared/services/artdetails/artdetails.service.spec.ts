import { TestBed } from '@angular/core/testing';

import { ArtdetailsService } from './artdetails.service';

describe('ArtdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtdetailsService = TestBed.get(ArtdetailsService);
    expect(service).toBeTruthy();
  });
});
