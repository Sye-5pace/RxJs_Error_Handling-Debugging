import { TestBed } from '@angular/core/testing';

import { FetchMockRequestService } from './fetch-mock-request.service';

describe('FetchMockRequestService', () => {
  let service: FetchMockRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchMockRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
