import { TestBed, inject } from '@angular/core/testing';

import { FirstRegisterService } from './first-register.service';

describe('FirstRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirstRegisterService]
    });
  });

  it('should be created', inject([FirstRegisterService], (service: FirstRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
