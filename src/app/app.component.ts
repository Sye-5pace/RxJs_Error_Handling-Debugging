import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchMockRequestService } from './services/fetch-mock-request.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  mockedData$ = this.fetchService.mockedData$;
  error$ = this.fetchService.error$;
  loading$ = this.fetchService.loading$;

  constructor(private fetchService: FetchMockRequestService) {}

  fetchData() {
    this.fetchService.fetchMockedRequest();
  }
}
