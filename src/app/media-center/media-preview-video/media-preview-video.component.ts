import { Component, ViewChild ,ElementRef} from '@angular/core';
import { MediaPreviewTextComponent } from '../media-preview-text/media-preview-text.component';
import { MediaCategoryService } from '../../../service/media-category.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import videojs from 'video.js'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-media-preview-video',
  imports: [MediaPreviewTextComponent, CommonModule ],
  templateUrl: './media-preview-video.component.html',
  styleUrls: ['./media-preview-video.component.scss']
})
export class MediaPreviewVideoComponent {
  constructor(public service: MediaCategoryService, public api: ApiService, private router:Router){}
  @ViewChild('videoScreen') videoPlayer!:ElementRef;

  player: any;

  headline:string='';
  description:string='';
  isData = true;
  subscription!: Subscription;

 ngAfterViewInit(){
    this.service.waitForData(() => {
      this.service.takeNewestVideoAsChoice();
      this.subscription = this.service.selectedChoice$.subscribe((item)=>{
        this.setupPlayer(item.url);
      });

    });
  }

  setupPlayer(url:string){
    if (!url || !this.videoPlayer || !this.videoPlayer.nativeElement) return;
    const videoElement = this.videoPlayer.nativeElement;
    if (this.player) {
      this.player.src({ src: url, type: 'application/x-mpegURL' });
      this.player.load();
      this.player.play();
    } else {
      this.player = videojs(videoElement, {}, () => {
      this.player.src({ src: url, type: 'application/x-mpegURL' });
      this.player.play();
      });
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    this.subscription?.unsubscribe();
  }

}
