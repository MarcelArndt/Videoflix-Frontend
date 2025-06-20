import { Injectable } from '@angular/core';
import { CategoryWrapper } from '../interface/interface';
import { CategoryItem } from '../interface/interface';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { MAIN_SERVICE_URL } from './config';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {

  constructor(private api: ApiService) { }
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

  async pullAllData(){
    const response = await this.api.GetJSON(MAIN_SERVICE_URL);
    this.dataquarry = await response.data
    if(this.dataquarry){
      this.dataReady = true;
    }
    await this.takeNewestVideoAsChoice()
  }

  async setRefreshData(){
    await this.pullAllData()
    this.toRefreshData = true;
    setTimeout(()=>{
    this.toRefreshData = false;
    },100);
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
