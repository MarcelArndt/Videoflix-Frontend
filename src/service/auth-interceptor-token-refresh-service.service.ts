import { Injectable } from '@angular/core';
import { Subject, interval, switchMap, takeUntil, catchError, EMPTY } from 'rxjs';
import { AuthService } from './auth.service';
import { ACCESS_TOKEN_EXPIRES_IN_MINUTES } from './config';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorTokenRefreshServiceService {

  private destroy$ = new Subject<void>();
  tokenExpirationTimeInMinutes: number = (ACCESS_TOKEN_EXPIRES_IN_MINUTES - 1) >= 1? (ACCESS_TOKEN_EXPIRES_IN_MINUTES - 1) : 1;
  private readonly refreshInterval = this.tokenExpirationTimeInMinutes * 60 * 1000;

  constructor(private authService: AuthService,) {}

   startAutoRefresh(): void {
    this.stopAutoRefresh();
    interval(this.refreshInterval)    
      .pipe( switchMap(() => {
          if (this.authService.isTokenValid()) {
            return this.authService.sendRequestForRefreshToken();
          } else {
            return EMPTY;

          }}), catchError(err => {
          this.authService.logout();
          return EMPTY;

        }), takeUntil(this.destroy$))
        .subscribe({ next: async (response: any) => {
          if (response) {
            await this.authService.refreshToken();
          }
        },error: (err) => {
          this.authService.logout();
        }
      });
  }

  stopAutoRefresh(): void {
    this.destroy$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
