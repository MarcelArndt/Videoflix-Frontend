import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Login } from '../interface/interface';
import { Router } from '@angular/router';
import { AlertsService } from '../share/alerts/alerts.service';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, REFRESH_URL, LOGOUT_URL, IS_AUTHENTICATED_URL } from './config';
import { Observable, firstValueFrom, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private api:ApiService, private router: Router, private alert: AlertsService, private http: HttpClient ) { }

emailConfirme!:boolean;
private authStatusSubject = new BehaviorSubject<boolean>(false);
authStatus$ = this.authStatusSubject.asObservable();


login(loginObject: Login): Observable<object> {
  return this.http.post(LOGIN_URL, loginObject, { withCredentials: true });
}

refreshToken() {
  return this.http.post(REFRESH_URL, {}, { withCredentials: true });
}

sendRequestForIsAuthenticated():Observable<{ email_confirmed: boolean }> {
  return this.http.post<{ email_confirmed: boolean }>(IS_AUTHENTICATED_URL, {}, { withCredentials: true });
}


async isAuthenticated() {
  try {
    const res = await firstValueFrom(this.sendRequestForIsAuthenticated());
    this.emailConfirme = res.email_confirmed;
    this.authStatusSubject.next(true)
  } catch (error) {
    console.log(error);
    this.authStatusSubject.next(false)
  }
}



logout() {
  return this.http.post(LOGOUT_URL, {}, { withCredentials: true });
}



    
}
