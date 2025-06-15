import { Injectable } from '@angular/core';
import { BASE_URL, LOGIN_URL, MAIN_SERVICE_URL,REGISTRATION_URL, FIND_USER_RESET_PASSWORD, RESET_PASSWORD, RESEND_EMAIL, UPLOAD_VIDEO  } from './config';
import { Login, Header, Registration, Response, ResetPassWordForm, AuthData, SendEmail} from '../interface/interface';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private router:Router, private http:HttpClient) { }

  userIsLogIn:boolean = false;

  createHeaders():Record<string, string> {
      const headers:Record<string, string>= {};
      const token = this.getAuthToken();
      if (token) {
          headers['Authorization'] = `Token ${token}`;
      }
      headers['Content-Type'] = 'application/json';
      return headers;
  }

  getAuthToken():string{
    return ''
  }


  checkForURLandHEADER(url:string,headers:Record<string, string>):Boolean{
    if (!url) {
      console.warn('No URL found for Post-Request');
      return false
    }
    if (!headers) {
      console.warn('No Header found for Post-Request');
      return false
   }
    return true
  }
  

  setAuthData(response:Response){
    if (!response.ok && response.status != 200) return
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser',JSON.stringify(response.data));
  }

  provideAuthData() {
    const response = localStorage.getItem('currentUser');
    if (!response) return null;
    return JSON.parse(response)
  }

  isUserLoggedIn():boolean{
     const authData = this.provideAuthData()
    if (!authData){
      this.router.navigate([''])
      this.userIsLogIn = false
      return false
    }
    if(authData && !authData.email_is_confirmed){
      const userdata = this.provideAuthData()
      localStorage.removeItem('currentUser');
      this.router.navigate(['sign_up/confirm'], { queryParams: { userId: userdata.user_id}})
      this.userIsLogIn = false
      return false
    }
    this.userIsLogIn = true
    return true
  }

  isUserAlreadyLoggedIn(){
    const authData = this.provideAuthData()
    if (authData){
      this.router.navigate(['/media'])
    }
  }

  async login(loginData:Login): Promise<Response>{
    if (!loginData) throw new Error('No Login-Data set for Sign-In.');
    const response = await this.postJSON(LOGIN_URL, loginData)
    if (response.ok) this.setAuthData(response)
    return response
  }

  async regist(registData: Registration): Promise<Response> {
    if (!registData)throw new Error('No registration data');
    return await this.postJSON(REGISTRATION_URL, registData);
  }

  async findUserByEmail(emailData = {email:""}){
      return await this.postJSON(FIND_USER_RESET_PASSWORD, emailData);
  }

  async resetPassword(resetData: ResetPassWordForm){
    if (!resetData)throw new Error('No User or Token in data');
    return await this.postJSON(RESET_PASSWORD, resetData);
  }

  async resendEmail(emailData: SendEmail){
    if (!emailData)throw new Error('No User or Token in data');
    return await this.postJSON(RESEND_EMAIL, emailData);
  }

  
  async postJSON(url: string, data: any): Promise<Response> {
    const headers:Record<string, string> = this.createHeaders();
    let promise = {'ok' : false, 'status' : 400, 'data' : null}
    if (!this.checkForURLandHEADER(url, headers)) return promise 
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) { throw new Error('Network response was not ok');} 
      return {'ok': response.ok, 'status': response.status, 'data': await response.json()}
    } catch(error){
    }
    return promise
}

async GetJSON(url:string): Promise<Response>{
  const headers:Record<string, string> = this.createHeaders();
  let promise = {'ok' : false, 'status' : 400, 'data' : null}
  if (!this.checkForURLandHEADER(url, headers)) return promise
  try{
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      if (!response.ok) { throw new Error('Network response was not ok');} 
      return {'ok': response.ok, 'status': response.status, 'data': await response.json()}
    } catch(error){
    }
  return promise
}

  postVideo(videoObj: any): Observable<any> {
      const formData = new FormData();
      console.log(videoObj)
      formData.append('headline', videoObj.title);
      formData.append('description', videoObj.description);
      formData.append('genre', videoObj.genre.toLowerCase());
      formData.append('url', videoObj.original_file);
      const response = new HttpRequest('POST', UPLOAD_VIDEO, formData, { reportProgress: true});
      return this.http.request(response);
    }
}
