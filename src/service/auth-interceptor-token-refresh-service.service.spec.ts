import { TestBed } from '@angular/core/testing';

import { AuthInterceptorTokenRefreshServiceService } from './auth-interceptor-token-refresh-service.service';

describe('AuthInterceptorTokenRefreshServiceService', () => {
  let service: AuthInterceptorTokenRefreshServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptorTokenRefreshServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
