import { Component } from '@angular/core';
import { MediaPreviewVideoComponent } from './media-preview-video/media-preview-video.component';
import { MediaCategorySliderComponent } from './media-category-slider/media-category-slider.component';
import { ApiService } from '../../service/api.service';
import { PopupWindowComponent } from '../../share/popup-window/popup-window.component';
import { MediaCategoryService } from '../../service/media-category.service';
import { CommonModule } from '@angular/common';
import { VideoPlayerManagerService } from '../videoplayer/video-player-manager.service';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-media-center',
  imports: [MediaPreviewVideoComponent, MediaCategorySliderComponent, PopupWindowComponent, CommonModule ],
  templateUrl: './media-center.component.html',
  styleUrl: './media-center.component.scss'
})
export class MediaCenterComponent {
  constructor(private api:ApiService, public service: MediaCategoryService, private video:VideoPlayerManagerService, private auth:AuthService, private router: Router){
  }
  authSubscription!:Subscription;


  async ngOnInit(){
    await this.auth.isAuthenticated();
    this.userfallback()
    this.video.disableVideoMode();
    this.service.siteLoaded = true;
    this.api.isVideoMode = false;
  }


  async ngAfterViewInit(){
  }


  userfallback(){
    this.authSubscription = this.auth.authStatus$.subscribe(((auth:boolean) =>{
      if(!auth) {
        this.router.navigate(["/home"]);
      }
    }));
  }

  get serviceState():boolean{
    return this.service.toRefreshData
  }



}
