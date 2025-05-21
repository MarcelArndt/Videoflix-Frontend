import { Component } from '@angular/core';
import { MediaPreviewVideoComponent } from './media-preview-video/media-preview-video.component';
import { MediaCategorySliderComponent } from '../media-category-slider/media-category-slider.component';
@Component({
  selector: 'app-media-center',
  imports: [MediaPreviewVideoComponent, MediaCategorySliderComponent],
  templateUrl: './media-center.component.html',
  styleUrl: './media-center.component.scss'
})
export class MediaCenterComponent {

}
