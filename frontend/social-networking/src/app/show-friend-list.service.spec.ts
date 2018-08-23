import { TestBed, inject } from '@angular/core/testing';

import { ShowFriendListService } from './show-friend-list.service';

describe('ShowFriendListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowFriendListService]
    });
  });

  it('should be created', inject([ShowFriendListService], (service: ShowFriendListService) => {
    expect(service).toBeTruthy();
  }));
});
