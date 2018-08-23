import { TestBed, inject } from '@angular/core/testing';

import { FindFriendService } from './find-friend.service';

describe('FindFriendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindFriendService]
    });
  });

  it('should be created', inject([FindFriendService], (service: FindFriendService) => {
    expect(service).toBeTruthy();
  }));
});
