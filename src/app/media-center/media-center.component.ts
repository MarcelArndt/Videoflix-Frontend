import { Component } from '@angular/core';
import { MediaPreviewVideoComponent } from './media-preview-video/media-preview-video.component';
import { MediaCategorySliderComponent } from './media-category-slider/media-category-slider.component';
import { ApiService } from '../../service/api.service';
import { PopupWindowComponent } from '../../share/popup-window/popup-window.component';
import { MediaCategoryService } from '../../service/media-category.service';
import { CommonModule } from '@angular/common';
import { VideoPlayerManagerService } from '../videoplayer/video-player-manager.service';
import { AuthService } from '../../service/auth.service';
import { firstValueFrom, Subscription } from 'rxjs';
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
    this.auth.setSiteIsGuarded()
    await this.auth.isAuth();
    this.video.disableVideoMode();
    this.service.siteLoaded = true;
    this.api.isVideoMode = false;
  }

  async ngAfterViewInit(){
    const auth = await firstValueFrom(this.auth.authStatus$);
    if (auth) this.service.startGlobalVideoStatusPulling();
  }


  get serviceState():boolean{
    return this.service.toRefreshData
  }



}
