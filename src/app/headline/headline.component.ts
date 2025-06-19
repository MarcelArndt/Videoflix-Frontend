import { Component, HostListener} from '@angular/core';
import { RouterLink, Router, NavigationStart} from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../share/icon/icon.component';
import { ApiService } from '../../service/api.service';
import { PopupServiceService } from '../../share/popup-window/popup-service.service';
import { AddVideoFormComponent } from '../add-video-form/add-video-form.component';



@Component({
  selector: 'app-headline',
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {

    sourceOfLogo:string=''
    sourceOfLogoDefault = ''
    

  constructor(private router:Router, public api:ApiService, private popUpService: PopupServiceService){}


  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth <= 650){
       this.sourceOfLogo = './assets/logo-small.svg'
    }
    else {
        this.sourceOfLogo = './assets/logo.svg'
    }
  }

  logUserOut(){
    localStorage.removeItem('currentUser');
    this.api.isUserLoggedIn();
    this.router.navigate(['']);
  }
  
  ngOnInit(){
    this.onResize();
  }

  openPopUpWindow(){
    this.popUpService.openPopUp(AddVideoFormComponent);
  }
}
