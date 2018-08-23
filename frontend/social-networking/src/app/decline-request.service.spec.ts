import { TestBed, inject } from '@angular/core/testing';

import { DeclineRequestService } from './decline-request.service';

describe('DeclineRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeclineRequestService]
    });
  });

  it('should be created', inject([DeclineRequestService], (service: DeclineRequestService) => {
    expect(service).toBeTruthy();
  }));
});
