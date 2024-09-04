import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry, tap } from 'rxjs/operators';

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
      // Task 3: Debug with Tap operator
      tap(()=> console.log('Http request initalized')),
      map(() => 'Mocked http request response'),
      map(response => {
        if (Math.random() > 0.5) {
          return response;
        } else {
          throw new Error('Mock request error');
        }
      }),
      // Task 2: Implementing Error Handling:
      // Using CatchError and Retry Operator
      retry(3),
      catchError(err => {
        console.error('Retries exhausted. Providing fallback response.', err);
        return of('Fallback response after retries failed')
      }),
      // Task 3: Debug with Tap operator
      tap({
        next: (value) => console.log('Response received:', value),
        error: (err) => console.error('Error occurred:', err),
        complete: () => console.log('Request completed.')
      })
    );
  }
}
