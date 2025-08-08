import { Component, ViewChild ,ElementRef, ChangeDetectorRef} from '@angular/core';
import { MediaPreviewTextComponent } from '../media-preview-text/media-preview-text.component';
import { MediaCategoryService } from '../../../service/media-category.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import videojs from 'video.js'
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-media-preview-video',
  imports: [MediaPreviewTextComponent, CommonModule ],
  templateUrl: './media-preview-video.component.html',
  styleUrls: ['./media-preview-video.component.scss']
})
export class MediaPreviewVideoComponent {
  constructor(public service: MediaCategoryService, public api: ApiService,  private cdr: ChangeDetectorRef){}
  @ViewChild('videoScreen') videoPlayer!:ElementRef;

  player: any;

  headline:string='';
  description:string='';
  isData = true;
  selectedChoicesubscription!: Subscription;
  fisrtVideoIsReadySubscription = new Subscription();

  ngOnInit() {
    this.fisrtVideoIsReadySubscription = this.service.firstConversionFinished$.subscribe(() => {
      window.location.reload();
    });
  }

  async ngAfterViewInit() {
      await this.service.pullAllData();
      await this.service.takeNewestVideoAsChoice();
      this.cdr.detectChanges();
      this.selectedChoicesubscription = this.service.selectedChoice$.subscribe((item)=>{
          if (item && item.url){
            this.setupPlayer(item.url);
          } 
      });
    this.service.startGlobalVideoStatusPulling();
  }

  setupPlayer(url:string){
    if (!url || !this.videoPlayer || !this.videoPlayer.nativeElement) return;
    const videoElement = this.videoPlayer.nativeElement;
    if (!this.player) {
      this.player = videojs(videoElement, {}, () => {});
    }
    this.player.src({ src: url, type: 'application/x-mpegURL' });
    this.player.load();
    this.player.play();
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    this.selectedChoicesubscription?.unsubscribe();
    this.fisrtVideoIsReadySubscription?.unsubscribe();
  }

}
