import { Injectable} from '@angular/core';
import { UPLOAD_VIDEO} from './config';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { AlertsService } from '../share/alerts/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient, private alert:AlertsService) { }

  isImpressum:boolean = false;
  isVideoMode:boolean = false;

  switchIsImpressum(isImpressum:boolean){
    this.isImpressum = isImpressum
  }

  postVideo(videoObj: any): Observable<any> {
      const formData = new FormData();
      formData.append('headline', videoObj.title);
      formData.append('description', videoObj.description);
      formData.append('genre', videoObj.genre.toLowerCase());
      formData.append('url', videoObj.original_file);
        const response = new HttpRequest( 'POST', UPLOAD_VIDEO, formData, { reportProgress: true, withCredentials: true });
      return this.http.request(response);
    }

  // Nur abfraen value !== undefined && value !== null, damit sowas wie z.B. videoId = 0 oder videoFinished = false mitgegeben werden kann.
  sendGetRquest(url:string, queryParams?: { [key: string]: any }){
    let params = new HttpParams();
    if (queryParams){
      Object.entries(queryParams).forEach(([key, value])=>{
        if(value !== undefined && value !== null){
          params = params.set(key, value);
        }
      });
    }
    return this.http.get(url,{params: params, withCredentials: true });
  }
  
  async get(url:string, queryParams?: { [key: string]: any }){
    try{
      let res = await firstValueFrom(this.sendGetRquest(url, queryParams)) || null;
      return res
    } catch(error){
      return { 'ok' : false };
    }
  }

  sendPostRequest(url:string,body:{[key:string]:any}){
    const res = this.http.post(url, body, {withCredentials: true });
    return res;
  }

  async post(url:string, body: { [key: string]: any } | null = null){
    if (!body) body = {} 
    const res = await firstValueFrom(this.sendPostRequest(url,body));
    return res
  }

  sendPatchRequest(url:string,body:{[key:string]:any}){
    const res = this.http.patch(url, body, { withCredentials: true });
    return res;
  }

  async patch(url:string, body: { [key: string]: any }){
    return await firstValueFrom(this.sendPatchRequest(url,body));
  }

  sendDeleteRequest(url:string){
    const res = this.http.delete(url,{ withCredentials: true });
    return res;
  }

  async delete(url:string, ){
    return await firstValueFrom(this.sendDeleteRequest(url));
  }

}
