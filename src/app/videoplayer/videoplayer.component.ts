import { Component, viewChild, ViewChild, ElementRef, ViewEncapsulation, HostListener } from '@angular/core';
import { MediaCategoryService } from '../../service/media-category.service';
import { ApiService } from '../../service/api.service';
import { VideoPlayerManagerService } from './video-player-manager.service';
import { firstValueFrom, Subscription } from 'rxjs';
import videojs from 'video.js'
import { ActivatedRoute } from '@angular/router';
import { UPLOAD_VIDEO } from '../../../config';
import { HttpClient} from '@angular/common/http';
import { UPDATE_INTERVAL_PROGRESS_IN_SEC, VIDEO_PROGRESS_URL } from '../../../config';
import { AuthService } from '../../service/auth.service';
import { videoProgress } from '../../interface/interface';
import { Router } from '@angular/router';
import { RewindButton, ForwardButton, addCustomButtons } from './customs-buttons/timecontrolButtons';

@Component({
  selector: 'app-videoplayer',
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss','./videoJs.scss', './customs-buttons/style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoplayerComponent {

  
  constructor(public service:MediaCategoryService, private api:ApiService, private video:VideoPlayerManagerService, private route: ActivatedRoute, private http:HttpClient, private auth:AuthService, private router:Router ){}


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
  updateInterval:number = UPDATE_INTERVAL_PROGRESS_IN_SEC;
  lastSavedTime!:number;
  latestProgressId!:number
  isMobilDevice:boolean = false;
  isLandscapemode:boolean= false;

  @HostListener('window:orientationchange', [])
  onOrientationChange() {
    this.checkForMobilDevice();
    this.checkForLandscapeMode();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkForMobilDevice();
    this.checkForLandscapeMode();
  }


checkForUrlParams(){
  this.paramSubscription = this.route.queryParams.subscribe(async (params) => {
    this.currentVideoId = params['videoId'] || '';
    if (this.currentVideoId) {
      await this.getVideo();
    }
  });
}

async getVideo(){
  try {
    const url = UPLOAD_VIDEO + `${this.currentVideoId}/`
    let response = await this.api.get(url);
    this.service.setNewSelectedChoice(response);
  } catch (error) {
    console.error('Fehler beim Laden des Videos:', error);
  }
}


initPlayer(){
    this.subscription = this.service.selectedChoice$.subscribe((item) => {
    if (!item?.url) return;
    if (this.playerReady) {
      this.setupPlayer(item.url);
    } else {
      this.bufferedVideoUrl = item.url;
    }
  });
}


setupPlayer(url: string) {
  const videoElement = this.videoPlayer.nativeElement;
  if (this.player) {
    this.player.src({ src: url, type: 'application/x-mpegURL' });
    this.player.load();
  } else {
    this.player = videojs(videoElement, {
      controls: true,
      playbackRates: [0.5, 1, 1.5, 2], 
      controlBar: {
        children: [ 'playToggle', 'volumePanel', 'currentTimeDisplay', 'progressControl', 'durationDisplay', 'playbackRateMenuButton', 'fullscreenToggle' ]
      }
    }, () => {
      this.player.src({ src: url, type: 'application/x-mpegURL' });
      addCustomButtons(this.player);
      this.player.load();
    });
  }
}


async isVideoEnded(){
 await this.saveProgress(this.videoPlayer.nativeElement.duration, true);
}


async onTimeUpdate(){
  const currentTime = this.videoPlayer.nativeElement.currentTime;
  if (Math.abs(currentTime - this.lastSavedTime) >= this.updateInterval) {
    this.lastSavedTime = currentTime;
    await this.saveProgress(currentTime, false);
  }
}

async updateOnSeek(){
  const currentTime = this.videoPlayer.nativeElement.currentTime;
  this.lastSavedTime = currentTime;
  await this.saveProgress(currentTime, false);
}

checkForMobilDevice() {
  const isUserAgentMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isSmallViewport = window.innerWidth <= 768;
  if (isUserAgentMobile && isSmallViewport || isUserAgentMobile && !isSmallViewport ) this.isMobilDevice = true
  if (!isUserAgentMobile && !isSmallViewport || !isUserAgentMobile && isSmallViewport) this.isMobilDevice = false
}

checkForLandscapeMode() {
  this.isLandscapemode = window.innerWidth > window.innerHeight
  if(!this.isLandscapemode && this.isMobilDevice){
    document.body.classList.add("force-landscape");
  }

  if(this.isLandscapemode){
    document.body.classList.remove("force-landscape");
  }
}



async ngAfterViewInit() {
  await this.auth.isAuth();
  this.video.enableVideoMode();
  this.checkForMobilDevice();
  this.checkForLandscapeMode();
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




async askForLatestTime(){
  const auth = await firstValueFrom(this.auth.authStatus$);
  if(!auth) return;
  const params = {'videoId': this.currentVideoId}
  const res:videoProgress[] = await this.api.get(VIDEO_PROGRESS_URL, params) as videoProgress[];
  if (res.length <= 0){
    const body = {'video': this.currentVideoId};
    await this.api.post(VIDEO_PROGRESS_URL, body);
    await this.askForLatestTime();
  } else {
    this.lastSavedTime = res[0].current_time
    this.videoPlayer.nativeElement.currentTime = res[0].current_time
    this.latestProgressId = res[0].id
  }
}


async ngOnInit() {
  this.auth.setSiteIsGuarded();
  await this.auth.isAuth();
  this.checkForUrlParams();
  this.initPlayer();
  await this.askForLatestTime();
  this.api.isVideoMode = true;
}


async saveProgress(currentTime: number, isFinished: boolean) {
    const body = {
      'current_time': currentTime,
      'is_finished': isFinished,
      'video': this.currentVideoId
    };

    const url = VIDEO_PROGRESS_URL + `${this.latestProgressId}`
    await this.api.patch(url,body)
  }


ngOnDestroy() {
  this.player?.dispose();
  this.subscription?.unsubscribe();
  this.paramSubscription?.unsubscribe();
  this.httpSubscription?.unsubscribe();
}
}
