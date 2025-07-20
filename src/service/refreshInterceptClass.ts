import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}
  refreshErrorCounter:number = 0

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.refreshErrorCounter < 3) {
          // Bei 401 → Token refreshen
          return from(this.auth.refreshToken()).pipe(
            switchMap(success => {
              if (success) {
                console.log('refresh success')
                // Retry mit demselben Request nach erfolgreichem Refresh
                return next.handle(req);
              } else {
                console.log('refresh failed')
                this.refreshErrorCounter ++
                this.auth.logout();
                return throwError(() => new Error('Unauthorized after token refresh'));
              }
            }),
            catchError(() => {
              this.auth.logout();
              return throwError(() => new Error('Refresh token failed'));
            })
          );
        } else {
          // Andere Fehler normal durchreichen
          return throwError(() => error);
        }
      })
    );
  }
}