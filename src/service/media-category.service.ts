import { Injectable } from '@angular/core';
import { CategoryWrapper } from '../interface/interface';
import { CategoryItem } from '../interface/interface';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { MAIN_SERVICE_URL } from './config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {

  constructor(private api: ApiService, private http:HttpClient, private auth:AuthService, private router: Router) { }
  public toRefreshData: boolean = false;
  public dataReady: boolean = false;
  public refreshData = false;
  public siteLoadet = false;
  public lenghtOfData:number = 0;

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
    if (!this.dataquarry || this.lenghtOfData <= 0) return
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

  async pullAllData()  {
    const auth = await this.auth.isAuth()
    if (!auth) return
    const res =  await firstValueFrom(this.sendRequest());
    if(res){
      this.dataquarry = res as CategoryWrapper
      this.lenghtOfData = Object.keys(this.dataquarry).length
      this.dataReady = true
    }
  }

  async refreshAllData(){
    this.refreshData = true
    this.dataReady = false;
    await this.pullAllData();
    await this.takeNewestVideoAsChoice();
    this.waitForData(()=>{
       this.refreshData = false;
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
