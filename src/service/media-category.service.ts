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

  private selectedChoiceSubject = new BehaviorSubject<CategoryItem>({
    id:0,
    url: './assets/placeholder/videos/adventure/852364-hd_1280_720_24fps.mp4',
    thumbnail: './assets/placeholder/thumbnails/Frame 167.jpg',
    headline: 'Headline_0',
    description:'Test-description'
  });
   selectedChoice$ = this.selectedChoiceSubject.asObservable();

  switchCurrentChoice(category:string, index:number){
    const newItem = JSON.parse(JSON.stringify(this.dataquarry[category].content[index]));
     this.selectedChoiceSubject.next({ ...newItem });
  }

  async pullAllData(){
    const response = await this.api.GetJSON(MAIN_SERVICE_URL);
    this.dataquarry = await response.data
    console.log(this.dataquarry)
  }

  dataquarry: CategoryWrapper  = {}
}
