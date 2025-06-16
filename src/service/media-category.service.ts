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

  toRefreshData = false;

  private selectedChoiceSubject = new BehaviorSubject<CategoryItem>({
    id:0,
    url: '',
    thumbnail: '',
    headline: '',
    description:''
  });
   selectedChoice$ = this.selectedChoiceSubject.asObservable();

  switchCurrentChoice(category:string, index:number){
    const newItem = JSON.parse(JSON.stringify(this.dataquarry[category].content[index]));
     this.selectedChoiceSubject.next({ ...newItem });
  }

  async takeNewestVideoAsChoice(){
    const newItem = await JSON.parse(JSON.stringify(this.dataquarry['newOnVideoflix'].content[0]));
    console.log(newItem )
    this.selectedChoiceSubject.next({ ...newItem });

  }

  async pullAllData(){
    const response = await this.api.GetJSON(MAIN_SERVICE_URL);
    this.dataquarry = await response.data
    await this.takeNewestVideoAsChoice()
    console.log(this.dataquarry)
  }

  setRefreshData(){
    this.toRefreshData = true;
    setTimeout(()=>{
    this.toRefreshData = false;
    },100);

  }

  dataquarry: CategoryWrapper  = {}
}
