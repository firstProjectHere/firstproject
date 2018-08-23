import { TestBed, inject } from '@angular/core/testing';

import { FirstLoginService } from './first-login.service';

describe('FirstLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstLoginService]
    });
  });

  it('should be created', inject([FirstLoginService], (service: FirstLoginService) => {
    expect(service).toBeTruthy();
  }));
});
