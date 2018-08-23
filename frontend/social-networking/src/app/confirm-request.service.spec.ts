import { TestBed, inject } from '@angular/core/testing';

import { ConfirmRequestService } from './confirm-request.service';

describe('ConfirmRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmRequestService]
    });
  });

  it('should be created', inject([ConfirmRequestService], (service: ConfirmRequestService) => {
    expect(service).toBeTruthy();
  }));
});
