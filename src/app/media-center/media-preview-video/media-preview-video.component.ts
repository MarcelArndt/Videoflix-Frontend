import { Component, ViewChild ,ElementRef} from '@angular/core';
import { MediaPreviewTextComponent } from '../media-preview-text/media-preview-text.component';
import { MediaCategoryService } from '../../../service/media-category.service';
import { BehaviorSubject } from 'rxjs';
import { CategoryItem } from '../../../interface/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-preview-video',
  imports: [MediaPreviewTextComponent, CommonModule ],
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
      videoHTMLElement.muted = true;
      videoHTMLElement.load();
      videoHTMLElement.play().catch();
      const onCanPlay = () => {
        videoHTMLElement.removeEventListener('canplay', onCanPlay);
      };
      videoHTMLElement.addEventListener('canplay', onCanPlay);
    }
  });
  }
}
