import { Component, HostListener} from '@angular/core';
import { RouterLink, Router, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { IconComponent } from '../../share/icon/icon.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-headline',
  imports: [CommonModule, RouterLink, IconComponent],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {

    sourceOfLogo:string=''
    sourceOfLogoDefault = ''
    

  constructor(private router:Router, public api:ApiService){}


  @HostListener('window:resize', [])
  onResize() {
    this.sourceOfLogo = this.checkUlrForLogo()
    if (window.innerWidth <= 650){
      this.sourceOfLogo = './assets/logo-small.svg'
    }
  }

  logUserOut(){
    localStorage.removeItem('currentUser');
    this.api.isUserLoggedIn()
    this.router.navigate([''])

  }


  checkUlrForLogo(){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      console.log(this.sourceOfLogoDefault)
        this.sourceOfLogoDefault = event.urlAfterRedirects == '/media' ? './assets/logo-small.svg' : './assets/logo.svg';
      });
      return this.sourceOfLogoDefault
  }
  
  initLogoPath(url:string){
    console.log(url)
    this.sourceOfLogoDefault = url == '' ? './assets/logo.svg' : './assets/logo-small.svg';
  }

  ngOnInit(){
    this.initLogoPath(this.router.url)
    this.checkUlrForLogo()
    this.api.isUserLoggedIn()
    this.onResize()
  }
}
