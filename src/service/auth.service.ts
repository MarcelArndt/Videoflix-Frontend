import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Login } from '../interface/interface';
import { Router} from '@angular/router';
import { AlertsService } from '../share/alerts/alerts.service';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, REFRESH_URL, LOGOUT_URL, IS_AUTHENTICATED_URL } from './config';
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


sendRequestForLogin(loginObject: Login): Observable<object> {
  return this.http.post(LOGIN_URL, loginObject, { withCredentials: true });
}


async login(loginObject: Login):Promise<boolean>{
  try{
    const resLogin:AuthResponse = await firstValueFrom(this.sendRequestForLogin(loginObject)) as AuthResponse;
    if (resLogin.ok) return true
  }
  catch(error){
    return false
  }
  return false
}

sendRequestForRefreshToken() {
  return this.http.post(REFRESH_URL, {}, { withCredentials: true });
}

async reshToken(){
  const res = await firstValueFrom(this.sendRequestForRefreshToken());
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
    }
  } catch (error) {
    this.authStatusSubject.next(false)
  }
}

sendRequestForLogout(){
  return this.http.post(LOGOUT_URL, {}, { withCredentials: true });
}

async logout() {
  const res = await firstValueFrom(this.sendRequestForLogout());
}

async isAuth(){
  const auth = await this.getAuthenticated();
  console.log(auth);
  if (!auth){
      this.router.navigate(['/home']);
      return false;
  }
  return true;
}

}

