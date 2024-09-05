import { TestBed } from '@angular/core/testing';

import { FetchMockRequestService } from './fetch-mock-request.service';
import { of, throwError } from 'rxjs';

describe('FetchMockRequestService', () => {
  let service: FetchMockRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchMockRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a successful response when the mock request succeeds', (done) => {
    const mockService = {
      mockRequest: jest.fn().mockReturnValue(of('Mocked http request response'))
    };
    const service = new FetchMockRequestService(mockService as any);

    service.mockedData$.subscribe(response => {
      expect(response).toBe('Mocked http request response');
      done();
    });

    service.fetchMockedRequest();
  });

  it('should provide fallback response after retries fail', () => {
    const mockService = {
      mockRequest: jest.fn().mockReturnValue(throwError(new Error('Mock request error')))
    };
    const service = new FetchMockRequestService(mockService as any);

    service.error$.subscribe(error => {
      expect(error).toBe('Mock request error');
    });

    service.fetchMockedRequest();
  });

  it('should display loading indicator during request', () => {
    const mockService = {
      mockRequest: jest.fn().mockReturnValue(of('Mocked http request response'))
    };
    const service = new FetchMockRequestService(mockService as any);

    service.loading$.subscribe(loading => {
      expect(loading).toBe(true);
    });

    service.fetchMockedRequest();
  });

  it('should log error message when request fails', () => {
    const mockService = {
      mockRequest: jest.fn().mockReturnValue(throwError(new Error('Mock request error')))
    };
    const service = new FetchMockRequestService(mockService as any);

    service.error$.subscribe(errorMessage => {
      expect(errorMessage).toBe('Mock request error');
    });

    service.fetchMockedRequest();
  });
});
