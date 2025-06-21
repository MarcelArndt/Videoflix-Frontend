import { Component, viewChild, ViewChild, ElementRef } from '@angular/core';
import { MediaCategoryService } from '../../service/media-category.service';
import { ApiService } from '../../service/api.service';
import { VideoPlayerManagerService } from './video-player-manager.service';
import { Subscription } from 'rxjs';
import videojs from 'video.js'
import { ActivatedRoute } from '@angular/router';
import { UPLOAD_VIDEO } from '../../service/config';

@Component({
  selector: 'app-videoplayer',
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  constructor(public service:MediaCategoryService, private api:ApiService, private video:VideoPlayerManagerService, private route: ActivatedRoute){}

  @ViewChild('videoScreen') videoPlayer!:ElementRef;
  subscription!:Subscription;
  paramSubscription!:Subscription;
  player!:any;
  currentVideoId!:string;
  playerReady = false;
  bufferedVideoUrl: string | null = null;


checkForUrlParams(){
 this.paramSubscription = this.route.queryParams.subscribe(async params => {
    this.currentVideoId = params['videoId'] || '';
    if (this.currentVideoId) {
      await this.getVideo();
    }
  });
}

async getVideo(){
  try {
    const url = UPLOAD_VIDEO + `${this.currentVideoId}/`
    let response = await this.api.GetJSON(url);
    const data = await response.data;
    this.service.setNewSelectedChoice(data);
  } catch (error) {
    console.error('Fehler beim Laden des Videos:', error);
  }
}

ngOnInit() {
  this.subscription = this.service.selectedChoice$.subscribe((item) => {
    if (!item?.url) return;
    if (this.playerReady) {
      this.setupPlayer(item.url);
    } else {
      this.bufferedVideoUrl = item.url;
    }
  });

  this.paramSubscription = this.route.queryParams.subscribe(async (params) => {
    this.currentVideoId = params['videoId'] || '';
    if (this.currentVideoId) {
      await this.getVideo();
    }
  });
}


async ngAfterViewInit() {
  this.video.enableVideoMode();
  this.playerReady = true;
  if (this.bufferedVideoUrl) {
    this.setupPlayer(this.bufferedVideoUrl);
    this.bufferedVideoUrl = null;
  }
}

setupPlayer(url:string){
  const videoElement = this.videoPlayer.nativeElement;
  if (this.player) {
    this.player.src({ src: url, type: 'application/x-mpegURL' });
    this.player.load();


  } else {
    this.player = videojs(videoElement, {}, () => {
    this.player.src({ src: url, type: 'application/x-mpegURL' });
    this.player.load();
    });
  }
}

ngOnDestroy() {
  this.player?.dispose();
  this.subscription?.unsubscribe();
  this.paramSubscription?.unsubscribe();
}


}
