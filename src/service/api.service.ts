import { Injectable } from '@angular/core';
import { BASE_URL, LOGIN_URL, MAIN_SERVICE_URL, REGISTRATION_URL } from './config';
import { Login, Header, Registration, Response } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

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
  

  async login(loginData:Login): Promise<Response>{
    if (!loginData) throw new Error('No Login-Data set for Sign-In.');
    return await this.postJSON(LOGIN_URL, loginData)
  }

  async regist(registData: Registration): Promise<Response> {
    if (!registData)throw new Error('No registration data');
    return await this.postJSON(REGISTRATION_URL, registData);
  }

  async postJSON(url: string, data: any): Promise<Response> {
    const headers:Record<string, string> = this.createHeaders();
    let promise = {
        'ok' : false,
        'status' : 400,
        'data' : null
    }
    if (!this.checkForURLandHEADER(url, headers)) return promise 
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 

      return {
        'ok' : response.ok,
        'status' : response.status,
        'data' : await response.json()
      }
    } catch(error){
    }
    return promise
}



}
