import { TestBed, inject } from '@angular/core/testing';

import { RealChattingService } from './real-chatting.service';

describe('RealChattingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealChattingService]
    });
  });

  it('should be created', inject([RealChattingService], (service: RealChattingService) => {
    expect(service).toBeTruthy();
  }));
});
