import { TestBed, inject } from '@angular/core/testing';

import { PostShowService } from './post-show.service';

describe('PostShowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostShowService]
    });
  });

  it('should be created', inject([PostShowService], (service: PostShowService) => {
    expect(service).toBeTruthy();
  }));
});
