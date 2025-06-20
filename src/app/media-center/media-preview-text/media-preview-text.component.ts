import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';
import { MediaCategoryService } from '../../../service/media-category.service';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../../share/alerts/alerts.service';

@Component({
  selector: 'app-media-preview-text',
  imports: [IconComponent, RouterLink, CommonModule  ],
  templateUrl: './media-preview-text.component.html',
  styleUrl: './media-preview-text.component.scss'
})
export class MediaPreviewTextComponent {
  constructor(private service: MediaCategoryService, private alert: AlertsService ){}
  @Input() headline:string = '';
  @Input() description:string = '';
  isData:boolean = false;

  ngOnInit(){
   this.isData = this.service.checkForEmpty()
   if(!this.isData) this.alert.setAlert('No Video Found. Please Upload at least One Video!')
  }

}
