import { Injectable } from '@angular/core';
import { CategoryWrapper } from '../interface/interface';
import { CategoryItem } from '../interface/interface';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { MAIN_SERVICE_URL } from './config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {

  constructor(private api: ApiService, private http:HttpClient) { }
  public toRefreshData: boolean = false;
  public dataReady: boolean = false;

  private selectedChoiceSubject = new BehaviorSubject<CategoryItem>({
    id:0,
    url: '',
    thumbnail: '',
    headline: '',
    description:''
  });
  selectedChoice$ = this.selectedChoiceSubject.asObservable();
  dataquarry: CategoryWrapper  = {}

  async switchCurrentChoice(category:string, index:number){
    if (!this.dataquarry) return
    let newItem = null
    if (this.dataquarry[category].content[index]){
      newItem = await JSON.parse(JSON.stringify(this.dataquarry[category].content[index]));
    }
    if(!newItem) return
    this.selectedChoiceSubject.next({ ...newItem });
  }

  setNewSelectedChoice(video:any){
    this.selectedChoiceSubject.next(video);
  }

  async takeNewestVideoAsChoice(){
    if (!this.dataquarry) return
    let newItem = null
    if(this.dataquarry['newOnVideoflix'].content[0]){
          newItem = await JSON.parse(JSON.stringify(this.dataquarry['newOnVideoflix'].content[0]));
    }
    if(!newItem) return
    this.selectedChoiceSubject.next({ ...newItem });
  }


  sendRequest(): Observable<object> {
    return this.http.get(MAIN_SERVICE_URL, { withCredentials: true });
  }

  pullAllData()  {
    const request = this.sendRequest();
    request.subscribe({next:(res)=>{
      this.dataquarry = res as CategoryWrapper
      this.dataReady = true
    }, 
    error: (error)=>{
      console.log(error);
    }
    });
  }

  waitForData(dataReadyCallback: () => void) {
    const timer = setInterval(() => {
      if (this.dataReady) {
        clearInterval(timer);
        dataReadyCallback();
      }
    }, 100);
  }

  checkForEmpty():boolean{
    if(this.dataquarry)return true
    return false
  }

}
