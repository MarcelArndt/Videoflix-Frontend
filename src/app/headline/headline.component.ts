import { Component, HostListener} from '@angular/core';
import { RouterLink, Router, NavigationStart} from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../share/icon/icon.component';
import { ApiService } from '../../service/api.service';
import { PopupServiceService } from '../../share/popup-window/popup-service.service';
import { AddVideoFormComponent } from '../add-video-form/add-video-form.component';
import { VideoPlayerManagerService } from '../videoplayer/video-player-manager.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { MediaCategoryService } from '../../service/media-category.service';


@Component({
  selector: 'app-headline',
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {

    sourceOfLogo:string=''
    sourceOfLogoDefault = ''
    subscription!:Subscription;
    

  constructor(private router:Router, public api:ApiService, private popUpService: PopupServiceService, public video: VideoPlayerManagerService, public auth: AuthService, private service:MediaCategoryService){}


  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth <= 650 || this.api.isVideoMode){
       this.sourceOfLogo = './assets/logo-small.svg'
    }
    else {
        this.sourceOfLogo = './assets/logo.svg'
    }
  }

  async logUserOut(){
    await this.auth.logout();
    this.router.navigate(['']);
  }

  buttonBackwards(){
    this.video.disableVideoMode();
    this.service.refreshAllData();
    history.back();
  }
  
  async ngOnInit(){

    this.getSmallLogo()
    this.onResize();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }


  getSmallLogo(){
  this.subscription = this.video.isVideoMode$.subscribe((boolean)=>{
        this.api.isVideoMode = boolean
        if(boolean){
          this.sourceOfLogo = './assets/logo-small.svg';
        } else {
          this.onResize()
        }
      });
  }

  openPopUpWindow(){
    this.popUpService.openPopUp(AddVideoFormComponent);
  }
}
