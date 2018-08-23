import { TestBed, inject } from '@angular/core/testing';

import { PostUploadService } from './post-upload.service';

describe('PostUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostUploadService]
    });
  });

  it('should be created', inject([PostUploadService], (service: PostUploadService) => {
    expect(service).toBeTruthy();
  }));
});
