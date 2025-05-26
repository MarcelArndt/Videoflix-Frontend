import { Component, ViewChild ,ElementRef, AfterViewInit} from '@angular/core';
import { MediaPreviewTextComponent } from '../media-preview-text/media-preview-text.component';
import { MediaCategoryService } from '../media-category.service';
import { BehaviorSubject } from 'rxjs';
import { CategoryItem } from '../../../interface/interface';

@Component({
  selector: 'app-media-preview-video',
  imports: [MediaPreviewTextComponent ],
  templateUrl: './media-preview-video.component.html',
  styleUrl: './media-preview-video.component.scss'
})
export class MediaPreviewVideoComponent {
  constructor(public service: MediaCategoryService){}
  @ViewChild('videoScreen') videoPlayer!:ElementRef;

  headline:string='';
  discretion:string='';


  ngAfterViewInit(){
      this.service.selectedChoice$.subscribe((item: CategoryItem) => {
      const videoHTMLElement = this.videoPlayer.nativeElement;
      const sourceElement =  videoHTMLElement.querySelector('source');
      if (sourceElement) {
        sourceElement.setAttribute('src', item.url);
         videoHTMLElement.load();
         videoHTMLElement.play();
         this.headline = item.headline;
         this.discretion= item.discretion;
      }
    });
  }
}
