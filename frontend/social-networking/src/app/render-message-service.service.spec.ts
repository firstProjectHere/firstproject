import { TestBed, inject } from '@angular/core/testing';

import { RenderMessageServiceService } from './render-message-service.service';

describe('RenderMessageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderMessageServiceService]
    });
  });

  it('should be created', inject([RenderMessageServiceService], (service: RenderMessageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
