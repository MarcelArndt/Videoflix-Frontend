import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Login } from '../interface/interface';
import { Router} from '@angular/router';
import { AlertsService } from '../share/alerts/alerts.service';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, REFRESH_URL, LOGOUT_URL, IS_AUTHENTICATED_URL, REFRESH_TOKEN_INTERVAL_IN_MIN } from '../../config';
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
private tokenExpirationTime: number = 0;
private siteIsGuarded = false;
private refreshTokenInterval:any = null


sendRequestForLogin(loginObject: Login): Observable<object> {
  return this.http.post(LOGIN_URL, loginObject, { withCredentials: true });
}

async login(loginObject: Login):Promise<boolean>{
  try{
    const resLogin:AuthResponse = await firstValueFrom(this.sendRequestForLogin(loginObject)) as AuthResponse;
    if (resLogin.ok){
      this.authStatusSubject.next(true);
      return true
    } 
  }
  catch(error){
    return false
  }
  return false
}


sendRequestForRefreshToken() {
  return this.http.post(REFRESH_URL, {}, { withCredentials: true });
}

async refreshToken(): Promise<boolean> {
  try {
    const res = await firstValueFrom(this.sendRequestForRefreshToken()) as any;
    if (res.ok || res.authenticated) {
      return true;
    }
  } catch (error) {
    this.logout();
    return false;
  }
  return false;
}


sendRequestForIsAuthenticated():Observable<{ email_confirmed: boolean }> {
  return this.http.post<{ email_confirmed: boolean }>(IS_AUTHENTICATED_URL, {}, { withCredentials: true });
}


async askAuthGuard() {
  try {
    const res = await firstValueFrom(this.sendRequestForIsAuthenticated()) as Response ;
    if (res['authenticated']){
      this.emailConfirme = res['email_confirmed'];
      this.authStatusSubject.next(true);
    } else {
      this.authStatusSubject.next(false);
    }
  } catch (error) {
    this.authStatusSubject.next(false);
  }
}

async handleAuth(){
  await this.askAuthGuard();
  const auth = await firstValueFrom(this.authStatus$);

  if(auth){
    if (auth && !this.emailConfirme) {
      this.router.navigate(['/sign_up/confirm']);
      this.authStatusSubject.next(false);
    }
  }

  if(!auth && this.siteIsGuarded){
    this.router.navigate(['home']);
  }
}

setSiteIsGuarded(){
  this.siteIsGuarded = true;
}

setSiteIsUnguarded(){
  this.siteIsGuarded = false;
}


async isAuth(){
  await this.handleAuth();
  const auth = await firstValueFrom(this.authStatus$)
  if(auth) await this.refreshToken();
  if(auth && !this.refreshTokenInterval){
    const refreshTimer = REFRESH_TOKEN_INTERVAL_IN_MIN * 60 * 1000
    this.refreshTokenInterval = setInterval(async () => {
      try{
        await this.refreshToken();
      } catch(error){
        console.log(error) 
      }
    }, refreshTimer);
  }
  return auth;
}

sendRequestForLogout(){
  return this.http.post(LOGOUT_URL, {}, { withCredentials: true });
}

async logout(): Promise<void> {
  if(this.refreshTokenInterval){
    clearInterval(this.refreshTokenInterval);
    this.refreshTokenInterval = null;
  }
  try {
    await firstValueFrom(this.sendRequestForLogout());
  } catch (error) {
    console.error('Logout request failed:', error);
  }
    this.tokenExpirationTime = 0;
    this.authStatusSubject.next(false);
    this.router.navigate(['/home']);
  }
}

