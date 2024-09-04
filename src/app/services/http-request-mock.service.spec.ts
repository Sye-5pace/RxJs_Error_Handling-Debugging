import { TestBed } from '@angular/core/testing';

import { HttpRequestMockService } from './http-request-mock.service';

describe('HttpRequestMockService', () => {
  let service: HttpRequestMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
