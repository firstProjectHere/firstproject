import { TestBed, inject } from '@angular/core/testing';

import { FetchingImageService } from './fetching-image.service';

describe('FetchingImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchingImageService]
    });
  });

  it('should be created', inject([FetchingImageService], (service: FetchingImageService) => {
    expect(service).toBeTruthy();
  }));
});
