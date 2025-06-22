import { Component, viewChild, ViewChild, ElementRef } from '@angular/core';
import { MediaCategoryService } from '../../service/media-category.service';
import { ApiService } from '../../service/api.service';
import { VideoPlayerManagerService } from './video-player-manager.service';
import { Subscription } from 'rxjs';
import videojs from 'video.js'
import { ActivatedRoute } from '@angular/router';
import { UPLOAD_VIDEO } from '../../service/config';
import { HttpClient} from '@angular/common/http';
import { UPDATE_INTERVAL_PROGRESS, VIDEO_PROGRESS } from '../../service/config';


@Component({
  selector: 'app-videoplayer',
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  constructor(public service:MediaCategoryService, private api:ApiService, private video:VideoPlayerManagerService, private route: ActivatedRoute, private http:HttpClient){}

  @ViewChild('videoScreen') videoPlayer!:ElementRef;
  subscription!:Subscription;
  paramSubscription!:Subscription;
  httpSubscription!:Subscription;
  player!:any;
  currentVideoId!:string;
  playerReady = false;
  bufferedVideoUrl: string | null = null;
  videoProgressId!:number;
  videoBufferTimer!:number;
  updateInterval:number = UPDATE_INTERVAL_PROGRESS;
  lastSavedTime!:number;


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

isVideoEnded(){
 this.saveProgress(this.videoPlayer.nativeElement.duration, true);
}

onTimeUpdate(){
  const currentTime = this.videoPlayer.nativeElement.currentTime;
  if (!this.lastSavedTime) return
  if (Math.abs(currentTime - this.lastSavedTime) >= this.updateInterval) {
      this.lastSavedTime = currentTime;
      this.saveProgress(currentTime, false);
    }
}


ngAfterViewInit() {
  this.video.enableVideoMode();
  this.playerReady = true;
  if (this.bufferedVideoUrl) {
    this.setupPlayer(this.bufferedVideoUrl);
    this.bufferedVideoUrl = null;
  }
  if(this.videoBufferTimer){
    this.videoPlayer.nativeElement.currentTime = this.videoBufferTimer;
  }
  this.lastSavedTime = this.videoPlayer.nativeElement.currentTime
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

saveProgress(currentTime: number, isFinished: boolean) {
    const body = {
      video: this.currentVideoId,
      current_time: currentTime,
      is_finished: isFinished
    };

    if (this.videoProgressId) {
      const url = VIDEO_PROGRESS + `/${this.videoProgressId}`
      this.http.put(url, body).subscribe();
    } else {
      this.http.post(VIDEO_PROGRESS, body).subscribe((response: any) => {
        this.videoProgressId = response.id;
      });
    }
  }


ngOnDestroy() {
  this.player?.dispose();
  this.subscription?.unsubscribe();
  this.paramSubscription?.unsubscribe();
  this.httpSubscription?.unsubscribe();
}

}
