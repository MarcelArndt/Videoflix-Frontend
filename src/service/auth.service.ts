import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Login } from '../interface/interface';
import { Router} from '@angular/router';
import { AlertsService } from '../share/alerts/alerts.service';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, REFRESH_URL, LOGOUT_URL, IS_AUTHENTICATED_URL, ACCESS_TOKEN_EXPIRES_IN_MINUTES } from './config';
import { Observable, firstValueFrom, BehaviorSubject,switchMap, throwError, catchError } from 'rxjs';
import { Response } from '../interface/interface';

export interface AuthResponse {ok:boolean};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private api:ApiService, private router: Router, private alert: AlertsService, private http: HttpClient ) { }

emailConfirme!:boolean;
private authStatusSubject = new BehaviorSubject<boolean>(false);
authStatus$ = this.authStatusSubject.asObservable();
private authFailedCounter:number = 0;
private tokenExpirationTime: number = 0;
private tokenExpirationTimeInMinutes: number = (ACCESS_TOKEN_EXPIRES_IN_MINUTES) >= 1? ACCESS_TOKEN_EXPIRES_IN_MINUTES : 1;


sendRequestForLogin(loginObject: Login): Observable<object> {
  return this.http.post(LOGIN_URL, loginObject, { withCredentials: true });
}


async login(loginObject: Login):Promise<boolean>{
  try{
    const resLogin:AuthResponse = await firstValueFrom(this.sendRequestForLogin(loginObject)) as AuthResponse;
    if (resLogin.ok){
      this.tokenExpirationTime = Date.now() + (this.tokenExpirationTimeInMinutes * 60 * 1000)
      this.authStatusSubject.next(true);
      return true
    } 
  }
  catch(error){
    return false
  }
  return false
}

isTokenValid(): boolean {
  return Date.now() < this.tokenExpirationTime;
}

sendRequestForRefreshToken() {
  return this.http.post(REFRESH_URL, {}, { withCredentials: true });
}

tokenExpiresInSeconds(): number {
  return Math.max(0, (this.tokenExpirationTime - Date.now()) / 1000);
}

async refreshToken(): Promise<boolean> {
  try {
    const res = await firstValueFrom(this.sendRequestForRefreshToken()) as any;
    if (res.ok || res.authenticated) {
      this.tokenExpirationTime = Date.now() + (this.tokenExpirationTimeInMinutes * 60 * 1000);
      return true;
    }
  } catch (error) {
    this.logout();
  }
  return false;
}

tokenExpiresSoon(): boolean {
    return this.tokenExpiresInSeconds() < this.tokenExpirationTimeInMinutes;
  }


sendRequestForIsAuthenticated():Observable<{ email_confirmed: boolean }> {
  return this.http.post<{ email_confirmed: boolean }>(IS_AUTHENTICATED_URL, {}, { withCredentials: true });
}

async getAuthenticated():Promise<boolean> {
    const res = await firstValueFrom(this.sendRequestForIsAuthenticated()) as Response ;
    if(res['authenticated']){
      this.authStatusSubject.next(true)
      return true
    } else {
      this.authStatusSubject.next(false)
    }
    return false
}

async isAuthenticated() {
  try {
    const res = await firstValueFrom(this.sendRequestForIsAuthenticated()) as Response ;
    if (res['authenticated']){
      this.emailConfirme = res['email_confirmed'];
      this.authStatusSubject.next(true)
      if (!this.emailConfirme) {
        this.router.navigate(['/sign_up/confirm']);
      }
    } else {
      this.authFailedCounter++;
    }
  } catch (error) {
    this.authFailedCounter++;
    this.authStatusSubject.next(false);
  }
  if(this.authFailedCounter >= 3 ){
    this.logout();
  }
}

sendRequestForLogout(){
  return this.http.post(LOGOUT_URL, {}, { withCredentials: true });
}

async logout(): Promise<void> {
  try {
    await firstValueFrom(this.sendRequestForLogout());
  } catch (error) {
    console.error('Logout request failed:', error);
  }
  this.tokenExpirationTime = 0;
  this.authStatusSubject.next(false);
  this.authFailedCounter = 0;
  this.router.navigate(['/home']);
}

async isAuth(){
  if (await this.getAuthenticated()){
      return true;
  }
  this.router.navigate(['/home']);
  return false;
}
}

