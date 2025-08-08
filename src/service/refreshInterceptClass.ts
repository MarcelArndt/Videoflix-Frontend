import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LOGIN_URL } from '../../config';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}
  refreshErrorCounter:number = 0

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.refreshErrorCounter++
        const isLoginRequest = req.url.includes(LOGIN_URL);
        if (error.status === 401 && !isLoginRequest && this.refreshErrorCounter < 3) {
          // Bei 401 → Token refreshen
          return from(this.auth.refreshToken()).pipe(
            switchMap(success => {
              if (success) {
                console.log('refresh success')
                this.refreshErrorCounter = 0
                return next.handle(req);
              } else {
                console.log('refresh failed')
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