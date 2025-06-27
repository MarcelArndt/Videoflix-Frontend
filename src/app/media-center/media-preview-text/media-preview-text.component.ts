import { Component, Input } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { MediaCategoryService } from '../../../service/media-category.service';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../../share/alerts/alerts.service';
import { VideoPlayerManagerService } from '../../videoplayer/video-player-manager.service';
import { Subscription} from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-media-preview-text',
  imports: [IconComponent, CommonModule  ],
  templateUrl: './media-preview-text.component.html',
  styleUrl: './media-preview-text.component.scss'
})
export class MediaPreviewTextComponent {
  constructor(public service: MediaCategoryService, private alert: AlertsService , private video:VideoPlayerManagerService, private router: Router){}
  headline:string = '';
  description:string = '';
  isData:boolean = false;
  currenVideotId!:number;
  subscription!:Subscription;

  ngOnInit(){
  this.isData = this.service.checkForEmpty();
  if(!this.isData) this.alert.setAlert('No Video Found. Please Upload at least One Video!');
  this.subscription = this.service.selectedChoice$.subscribe((item)=>{
    this.currenVideotId = item.id
    this.description = item.description
    this.headline = item.headline
  });
  }

  openVideoPlayer(event:Event){
    event.preventDefault();
    this.router.navigate(['/video'], { queryParams: {videoId: this.currenVideotId} });
  }

}
