import { TestBed, inject } from '@angular/core/testing';

import { UnfriendUserService } from './unfriend-user.service';

describe('UnfriendUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnfriendUserService]
    });
  });

  it('should be created', inject([UnfriendUserService], (service: UnfriendUserService) => {
    expect(service).toBeTruthy();
  }));
});
