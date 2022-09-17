import { TestBed } from '@angular/core/testing';

import { HeaderRequestInterceptor } from './header-request.interceptor';

describe('HeaderRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeaderRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeaderRequestInterceptor = TestBed.inject(HeaderRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
