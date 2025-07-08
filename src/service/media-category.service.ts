import { Injectable } from '@angular/core';
import { CategoryWrapper } from '../interface/interface';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { MAIN_SERVICE_URL } from './config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { VideoStatus, CategoryItem } from '../interface/interface'; // Assuming you have this type defined in your interface file

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

  private selectedChoiceSubject = new BehaviorSubject<CategoryItem | null>(null);
  selectedChoice$ = this.selectedChoiceSubject.asObservable();
  private newestVideoSubject = new BehaviorSubject<CategoryItem | null>(null);
  newestVideo$ = this.newestVideoSubject.asObservable();
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

  setNewNewestVideoSubject(video:CategoryItem){
    this.newestVideoSubject.next({ ...video });
  }

  async takeNewestVideoAsChoice(){
    if (!this.dataquarry || this.lenghtOfData <= 0) return
    let newItem = null
    if(this.dataquarry['newOnVideoflix'].content[0]){
          newItem = await JSON.parse(JSON.stringify(this.dataquarry['newOnVideoflix'].content[0]));
    }
    if(!newItem) return
    this.selectedChoiceSubject.next({ ...newItem });
    this.newestVideoSubject.next({ ...newItem });
  }

  async checkStatusOfNewestVideo():Promise<VideoStatus>{

      const newestVideo = await firstValueFrom(this.newestVideo$);
      if (newestVideo && !newestVideo['is_converted']){
        const url = MAIN_SERVICE_URL + `${newestVideo['id']}`
        const item: CategoryItem = await firstValueFrom(this.http.get<CategoryItem>(url, { withCredentials: true }));
      if (!item['is_converted']){
        await this.refreshCategorySliderData()
        return [false,item['current_convert_state']]
      }
      if (item['is_converted']){
        return [true,100]
      }
      }
      return [false, 0];
  }

  sendRequest(): Observable<object> {
    return this.http.get(MAIN_SERVICE_URL, { withCredentials: true });
  }

  async pullAllData()  {
    const auth = await this.auth.isAuth()
    if (!auth) return
    const res =  await firstValueFrom(this.sendRequest()) || null;
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


   async refreshCategorySliderData(){
    this.refreshData = true;
    this.dataReady = false;
    await this.pullAllData();
    this.refreshData = false;
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
