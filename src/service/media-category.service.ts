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

  async switchCurrentChoice(category:string, index:number){
    const newItem = await JSON.parse(JSON.stringify(this.dataquarry[category].content[index]));
     this.selectedChoiceSubject.next({ ...newItem });
  }

  async takeNewestVideoAsChoice(){
    const newItem = await JSON.parse(JSON.stringify(this.dataquarry['newOnVideoflix'].content[0]));
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

  dataquarry: CategoryWrapper  = {}
}
