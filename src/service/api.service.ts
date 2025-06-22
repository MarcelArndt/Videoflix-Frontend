import { Injectable, RESPONSE_INIT } from '@angular/core';
import { BASE_URL, LOGIN_URL, MAIN_SERVICE_URL,REGISTRATION_URL, FIND_USER_RESET_PASSWORD, RESET_PASSWORD, RESEND_EMAIL, UPLOAD_VIDEO  } from './config';
import { Login, Header, Registration, Response, ResetPassWordForm, AuthData, SendEmail} from '../interface/interface';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertsService } from '../share/alerts/alerts.service';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private router:Router, private http:HttpClient, private alert:AlertsService) { }

  isImpressum:boolean = false;

  switchIsImpressum(isImpressum:boolean){
    this.isImpressum = isImpressum
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
    let promise = {'ok' : false, 'status' : 400, 'data' : null}
    try{
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      if (!response.ok) { throw new Error('Network response was not ok');} 
      return {'ok': response.ok, 'status': response.status, 'data': await response.json()}
    } catch(error){
    }
    return promise
}

async GetJSON(url:string): Promise<Response>{
  let promise = {'ok' : false, 'status' : 400, 'data' : null}
  try{
      const response = await fetch(url, {
        method: 'GET',
      });
      if (!response.ok) { throw new Error('Network response was not ok');} 
      return {'ok': response.ok, 'status': response.status, 'data': await response.json()}
    } catch(error){
    }
  return promise
}

  postVideo(videoObj: any): Observable<any> {
      const formData = new FormData();
      formData.append('headline', videoObj.title);
      formData.append('description', videoObj.description);
      formData.append('genre', videoObj.genre.toLowerCase());
      formData.append('url', videoObj.original_file);
      const response = new HttpRequest('POST', UPLOAD_VIDEO, formData, { reportProgress: true});
      return this.http.request(response);
    }
}
