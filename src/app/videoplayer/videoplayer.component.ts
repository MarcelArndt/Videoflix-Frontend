import { Component, viewChild, ViewChild, ElementRef } from '@angular/core';
import { MediaCategoryService } from '../../service/media-category.service';
import { CategoryItem } from '../../interface/interface';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-videoplayer',
  imports: [],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  @ViewChild('videoScreen')videoPlayer!:ElementRef;
  constructor(public service:MediaCategoryService, private api:ApiService){}

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
  ngOnInit(){
    this.api.isUserLoggedIn()
  }

}
