import { TestBed } from '@angular/core/testing';

import { HttpRequestMockService } from './http-request-mock.service';
import { throwError } from 'rxjs';

describe('HttpRequestMockService', () => {
  let service: HttpRequestMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a successful response after delay', (done) => {
    const service = new HttpRequestMockService();
    service.mockRequest().subscribe({
      next: (response) => {
        expect(response).toBe('Mocked http request response');
        done();
      },
      error: (err) => {
        done.fail(err);
      }
    });
  });

  it('should retry 3 times before emitting fallback response', (done) => {
    const service = new HttpRequestMockService();
    const mock = jest.spyOn(service, 'mockRequest').mockReturnValueOnce(throwError('Mock request error'));

    service.mockRequest().subscribe({
      next: () => {
        done.fail('Expected error but got success response');
      },
      error: (err) => {
        expect(err).toEqual(new Error('Mock request error'));
        expect(mock).toHaveBeenCalledTimes(4);
        done();
      }
    });
  });

  it('should provide fallback response when request fails', (done) => {
    const service = new HttpRequestMockService();
    service.mockRequest().subscribe({
      next: (response) => {
        done.fail('Expected error but received response: ' + response);
      },
      error: (err) => {
        expect(err.message).toBe('Mock request error');
        done();
      }
    });
  });
});
