import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//Task 1: Implement an observable for HTTP requests:
// Create an observable that simulates an HTTP request
// (use timer or of with delay to mimic network latency).
//  Add logic to randomly succeed or fail the request
export class HttpRequestMockService {

  constructor() { }

  mockRequest(): Observable<string> {
    return of(2, 4, 10, 9, 0).pipe(
      delay(800),
      map(() => 'Mocked http request response'),
      map(response => {
        if (Math.random() > 0.5) {
          return response;
        } else {
          throw new Error('Mock request error');
        }
      }),
      catchError(err => {
        return throwError(() => new Error('Mock request error'));
      })
    );
  }
}
