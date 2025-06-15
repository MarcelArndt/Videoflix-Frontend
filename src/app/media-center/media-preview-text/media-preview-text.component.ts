import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-preview-text',
  imports: [IconComponent, RouterLink  ],
  templateUrl: './media-preview-text.component.html',
  styleUrl: './media-preview-text.component.scss'
})
export class MediaPreviewTextComponent {
  @Input() headline:string = '';
  @Input() description:string = '';
}
