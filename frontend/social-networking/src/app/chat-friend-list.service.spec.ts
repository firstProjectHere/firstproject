import { TestBed, inject } from '@angular/core/testing';

import { ChatFriendListService } from './chat-friend-list.service';

describe('ChatFriendListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatFriendListService]
    });
  });

  it('should be created', inject([ChatFriendListService], (service: ChatFriendListService) => {
    expect(service).toBeTruthy();
  }));
});
