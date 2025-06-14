import { Component } from '@angular/core';
import { MediaPreviewVideoComponent } from './media-preview-video/media-preview-video.component';
import { MediaCategorySliderComponent } from './media-category-slider/media-category-slider.component';
import { ApiService } from '../../service/api.service';
import { PopupWindowComponent } from '../../share/popup-window/popup-window.component';

@Component({
  selector: 'app-media-center',
  imports: [MediaPreviewVideoComponent, MediaCategorySliderComponent, PopupWindowComponent ],
  templateUrl: './media-center.component.html',
  styleUrl: './media-center.component.scss'
})
export class MediaCenterComponent {
  constructor(private api:ApiService){
  }
  ngOnInit(){
     this.api.isUserLoggedIn()
  }



}
