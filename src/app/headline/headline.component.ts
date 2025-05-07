import { Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-headline',
  imports: [CommonModule],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {

  sourceOfLogo:string=''


  @HostListener('window:resize', [])
  onResize() {
    this.sourceOfLogo = './assets/logo.svg'
    if (window.innerWidth <= 650){
      this.sourceOfLogo = './assets/logo-small.svg'
    }
  }


  ngOnInit(){
    this.onResize()
  }
}
