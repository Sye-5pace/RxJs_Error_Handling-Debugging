import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize without errors when created', () => {
    const fetchServiceMock = {
      mockedData$: of([]),
      error$: of(null),
      loading$: of(false),
      fetchMockedRequest: jest.fn()
    };
    const component = new AppComponent(fetchServiceMock as any);
    expect(component).toBeTruthy();
  });

  it('should trigger fetchMockedRequest when fetchData is called', () => {
    const fetchServiceMock = {
        mockedData$: of([]),
        error$: of(null),
        loading$: of(false),
        fetchMockedRequest: jest.fn()
    };
    const component = new AppComponent(fetchServiceMock as any);

    component.fetchData();

    expect(fetchServiceMock.fetchMockedRequest).toHaveBeenCalled();
  });

  
});
