import { TestBed, inject } from '@angular/core/testing';

import { SendingRequestService } from './sending-request.service';

describe('SendingRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendingRequestService]
    });
  });

  it('should be created', inject([SendingRequestService], (service: SendingRequestService) => {
    expect(service).toBeTruthy();
  }));
});
