import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';
import { enableIsScrollAbleAnimtion } from '../sign-up-form/scrollbar';

@Component({
  selector: 'app-validated-mail',
  imports: [IconComponent, RouterLink],
  templateUrl: './validated-mail.component.html',
  styleUrls: ['./validated-mail.component.scss', "./../sign-up-form/show-scroolable.scss"]
})
export class ValidatedMailComponent {

  @ViewChild('scrollbar')scrollbar!:ElementRef;
  @ViewChild('scrollAnimtion')scrollAnimtion!:ElementRef;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.checkScrollbar()
  }

  ngAfterViewInit(){
    this.checkScrollbar()
  }

 checkScrollbar(){
      const barHeight = this.scrollbar.nativeElement.offsetHeight;
      const refHeight= document.documentElement.clientHeight;
      if (refHeight / 2 < barHeight){
        enableIsScrollAbleAnimtion(this.scrollAnimtion)
    }
  }

}
