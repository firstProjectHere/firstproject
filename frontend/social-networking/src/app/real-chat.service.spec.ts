import { TestBed, inject } from '@angular/core/testing';

import { RealChatService } from './real-chat.service';

describe('RealChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealChatService]
    });
  });

  it('should be created', inject([RealChatService], (service: RealChatService) => {
    expect(service).toBeTruthy();
  }));
});
