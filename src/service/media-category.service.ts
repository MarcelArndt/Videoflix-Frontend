import { Injectable } from '@angular/core';
import { CategoryWrapper } from '../interface/interface';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { MAIN_SERVICE_URL, VIDEO_CONVERT_PROGRESS_URL } from './config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { VideoStatus, CategoryItem, ConvertingVideoStatus } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {

  constructor(private api: ApiService, private http:HttpClient, private auth:AuthService, private router: Router) { }
  public toRefreshData: boolean = false;
  public dataReady: boolean = false;
  public refreshData = false;
  public lenghtOfData:number = 0;
  public siteLoaded:boolean = false;
  private selectedChoiceSubject = new BehaviorSubject<CategoryItem | null>(null);
  selectedChoice$ = this.selectedChoiceSubject.asObservable();
  private newestVideoSubject = new BehaviorSubject<CategoryItem | null>(null);
  newestVideo$ = this.newestVideoSubject.asObservable();
  dataQuarry: CategoryWrapper  = {}
  public convertingVideos: ConvertingVideoStatus[] = [];
  pollingInterval: any = null;
  allCategoryKey!:string[];


  collectAllKeysOfCategory(){
    this.allCategoryKey = Object.keys(this.dataQuarry);
  }

  async switchCurrentChoice(category:string, index:number){
    if (!this.dataQuarry || !this.dataQuarry[category].content[index].is_converted) return
    let newItem = null
    if (this.dataQuarry[category].content[index]){
      newItem = { ...this.dataQuarry[category].content[index] };
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
    if (!this.dataQuarry || this.lenghtOfData <= 0) return
    let newItem = null
    if(this.dataQuarry['newOnVideoflix'].content[0]){
          newItem = { ...this.dataQuarry['newOnVideoflix'].content[0] };
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

  sendRequest(index:number | null= null): Observable<object> {
    if (index) return this.http.get(MAIN_SERVICE_URL + index + '/' , { withCredentials: true });
    return this.http.get(MAIN_SERVICE_URL, { withCredentials: true });
  }

  askConvertStatus(index:number | null= null): Observable<object> {
    return this.http.get(VIDEO_CONVERT_PROGRESS_URL, { withCredentials: true });
  }


async updateSingleVideoStatus(){
  if(this.convertingVideos.length <= 0) return;
 for (const [index, videoInfos] of this.convertingVideos.entries()) {
    this.checkForDataQuarryId(videoInfos, index);
    const newVideoData: CategoryItem = await firstValueFrom(this.sendRequest(videoInfos.video)) as CategoryItem;
    if (videoInfos?.dataQuarryID == 0 || videoInfos?.dataQuarryID && videoInfos?.dataQuarryID >= 0) {
      this.dataQuarry[videoInfos.genre].content[videoInfos.dataQuarryID] = newVideoData;
      this.findCurrentNewestVideoAndUpdate(videoInfos, newVideoData);
    }
  }
  await this.checkServerForQueue();
}

findCurrentNewestVideoAndUpdate(videoInfos:ConvertingVideoStatus, videoData:CategoryItem){
  const index = this.dataQuarry['newOnVideoflix'].content.findIndex(videoItem => videoItem.id == videoInfos.video);
  this.dataQuarry['newOnVideoflix'].content[index] = videoData
}

async startGlobalVideoStatusPulling() {
  const isAuth = await firstValueFrom(this.auth.authStatus$)
  if (this.pollingInterval) return;
  await this.checkServerForQueue();
  this.pollingInterval = setInterval(() => {
    this.updateSingleVideoStatus();
    if (this.convertingVideos.length <= 0 || !isAuth) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }, 2000);
}

async checkServerForQueue(){
  const isAuth = await this.auth.isAuth();
  if (!isAuth) return;
  this.convertingVideos = await firstValueFrom(this.askConvertStatus()) as ConvertingVideoStatus[]
}

checkForDataQuarryId(videoInfos:ConvertingVideoStatus, index:number){
    const contentArray = this.dataQuarry[videoInfos.genre]?.content;
    if (contentArray){
      const newDataQuarryID = contentArray.findIndex((videoItem:CategoryItem) => videoItem.id === videoInfos.video);
      if (newDataQuarryID >= 0){
        this.convertingVideos[index].dataQuarryID = newDataQuarryID;
    }
  }
}

  async pullAllData()  {
    const isAuth = await this.auth.isAuth();
    if (!isAuth) return;
    try {
      const res =  await firstValueFrom(this.sendRequest()) || null;
      if(res){
      this.dataQuarry = res as CategoryWrapper
      this.lenghtOfData = Object.keys(this.dataQuarry).length
      this.dataReady = true
      this.collectAllKeysOfCategory()
    }
    } catch(error){
      this.dataReady = false
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
    return !!this.dataQuarry
  }

}
