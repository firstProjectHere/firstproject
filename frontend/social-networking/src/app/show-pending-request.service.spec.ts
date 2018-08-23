import { TestBed, inject } from '@angular/core/testing';

import { ShowPendingRequestService } from './show-pending-request.service';

describe('ShowPendingRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowPendingRequestService]
    });
  });

  it('should be created', inject([ShowPendingRequestService], (service: ShowPendingRequestService) => {
    expect(service).toBeTruthy();
  }));
});
