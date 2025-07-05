import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap, timeout } from 'rxjs/operators';
import { AuthService } from './auth.service';

  // next.handle(request) führt anfrage aus.
  // pipe sendet Ergebnis weiter .
  // falls Ergebnis Error 401 | keine Befugnis - wird ein Refresh des Tokens versucht.
  // switchMap wartet auf Antwort und nach Erfolg von Refresh wird urspüngliche Anfrage wiederholt. -> Happy Path
  // falls kein erfolg wird Error ausgegeben.

export const authRefreshInterceptor: HttpInterceptorFn = ( req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        if (req.url.includes('/refresh')) {
          authService.logout();
          return throwError(() => new Error('Refresh token is invalid'));
        }
        return authService.sendRequestForRefreshToken().pipe(
          switchMap((res:any) => {
            console.log(res)
            if (!res.authenticated){
              authService.logout();
              return throwError(() => new Error('Not authenticated after refresh'));
            }
            return next(req); 
          }),
          catchError(refreshErr => {
             authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() =>{
        authService.logout(); 
        console.log(err)});
    })
  );
};