import { Component } from '@angular/core';
import { MediaCategoryService } from './media-category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../interface/interface';
@Component({
  selector: 'app-media-category-slider',
  imports: [ CommonModule ],
  templateUrl: './media-category-slider.component.html',
  styleUrl: './media-category-slider.component.scss'
})
export class MediaCategorySliderComponent {
constructor(public service: MediaCategoryService){}

allCategoryKey:string[] = []


ngOnInit(){
  this.allCategoryKey = Object.keys(this.service.dataquarry)
}

arrayWithAllKeysOfItems(category: string): string[] {
  return Object.keys(this.service.dataquarry[category].content);
}




}
