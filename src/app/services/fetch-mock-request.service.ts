import { Injectable } from '@angular/core';
import { HttpRequestMockService } from './http-request-mock.service';
import { BehaviorSubject, catchError, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Task 1: Implement an observable for HTTP requests:
// Create an observable that simulates an HTTP request
// (use timer or of with delay to mimic network latency).
//  Add logic to randomly succeed or fail the request
export class FetchMockRequestService {
  private mockedDataSubject = new BehaviorSubject<string | null>(null);
  mockedData$ = this.mockedDataSubject.asObservable();
  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();


  constructor(private mockService: HttpRequestMockService) {}

  fetchMockedRequest() {
    // Task 4: Displaying Results: display a loading indicator while request is in progress
    this.loadingSubject.next(true);

    this.mockService.mockRequest().pipe(
      tap(() => console.log('Request started!')),
      switchMap((response: string) => {
        this.mockedDataSubject.next(response);
        return this.mockedDataSubject.asObservable();
      }),
      //Task 2: Implementing Error Handling: Using CatchError and Retry Operator
      catchError(err => {
        this.errorSubject.next(err.message);
        return this.errorSubject.asObservable();
      }),
      // Task 3: Debug with Tap operator
      tap(response => {
        if (response === null) {
          console.log('No data found in mock service or failed');
        } else {
          console.log('Request completed successfully', response);
        }
        // Task 4: Displaying Results: display a loading indicator while request is in progress
        this.loadingSubject.next(false);
      })
    ).subscribe();
  }
}
