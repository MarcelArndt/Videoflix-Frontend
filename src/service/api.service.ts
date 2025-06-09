import { Injectable } from '@angular/core';
import { BASE_URL, LOGIN_URL, MAIN_SERVICE_URL,REGISTRATION_URL, FIND_USER_RESET_PASSWORD, RESET_PASSWORD  } from './config';
import { Login, Header, Registration, Response, ResetPassWordForm, AuthData } from '../interface/interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private router:Router) { }


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
      localStorage.removeItem('currentUser');
      this.router.navigate(['sign_up/confirm'])
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
      return {'ok' : response.ok, 'status' : response.status, 'data' : await response.json()}
    } catch(error){
    }
    return promise
}



}
