import { Component, HostListener} from '@angular/core';
import { RouterLink, Router, NavigationStart} from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../share/icon/icon.component';
import { ApiService } from '../../service/api.service';
import { PopupServiceService } from '../../share/popup-window/popup-service.service';
import { AddVideoFormComponent } from '../add-video-form/add-video-form.component';
import { VideoPlayerManagerService } from '../videoplayer/video-player-manager.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-headline',
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {

    sourceOfLogo:string=''
    sourceOfLogoDefault = ''
    isVideoMode = false;
    subscription!:Subscription;
    

  constructor(private router:Router, public api:ApiService, private popUpService: PopupServiceService, public video: VideoPlayerManagerService){}


  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth <= 650 || this.isVideoMode){
       this.sourceOfLogo = './assets/logo-small.svg'
    }
    else {
        this.sourceOfLogo = './assets/logo.svg'
    }
  }

  logUserOut(){
    this.router.navigate(['']);
  }
  
  ngOnInit(){
    this.subscription = this.video.isVideoMode$.subscribe((boolean)=>{
      this.isVideoMode = boolean
      if(boolean){
        this.sourceOfLogo = './assets/logo-small.svg';
      } else {
        this.onResize()
      }
    });
    this.onResize();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  openPopUpWindow(){
    this.popUpService.openPopUp(AddVideoFormComponent);
  }
}
