import { TestBed, inject } from '@angular/core/testing';

import { SearchuserService } from './searchuser.service';

describe('SearchuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchuserService]
    });
  });

  it('should be created', inject([SearchuserService], (service: SearchuserService) => {
    expect(service).toBeTruthy();
  }));
});
