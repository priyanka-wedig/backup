import { TestBed } from '@angular/core/testing';

import { ArtistProfileService } from './artist-profile.service';

describe('ArtistProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistProfileService = TestBed.get(ArtistProfileService);
    expect(service).toBeTruthy();
  });
});
