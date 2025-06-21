import { Component } from '@angular/core';
import { MediaPreviewVideoComponent } from './media-preview-video/media-preview-video.component';
import { MediaCategorySliderComponent } from './media-category-slider/media-category-slider.component';
import { ApiService } from '../../service/api.service';
import { PopupWindowComponent } from '../../share/popup-window/popup-window.component';
import { MediaCategoryService } from '../../service/media-category.service';
import { CommonModule } from '@angular/common';
import { VideoPlayerManagerService } from '../videoplayer/video-player-manager.service';
@Component({
  selector: 'app-media-center',
  imports: [MediaPreviewVideoComponent, MediaCategorySliderComponent, PopupWindowComponent, CommonModule ],
  templateUrl: './media-center.component.html',
  styleUrl: './media-center.component.scss'
})
export class MediaCenterComponent {
  constructor(private api:ApiService, private service: MediaCategoryService, private video:VideoPlayerManagerService){
  }
  async ngOnInit(){
    this.api.isUserLoggedIn();
    await this.service.pullAllData();
    this.video.disableVideoMode();
  }

  get serviceState():boolean{
    return this.service.toRefreshData
  }



}
