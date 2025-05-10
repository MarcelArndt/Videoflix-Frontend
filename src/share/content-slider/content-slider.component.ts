import { Component, ViewChild,ElementRef, AfterRenderRef, viewChild, HostListener, Input} from '@angular/core';
import { SliderService } from './slider.service';

@Component({
  selector: 'content-slider',
  imports: [],
  templateUrl: './content-slider.component.html',
  styleUrl: './content-slider.component.scss'
})
export class ContentSliderComponent {
  constructor(public sliderservice: SliderService){}

  childBoxWitdh = 0
  

  @ViewChild("sliderContainer") container!:ElementRef;
  @ViewChild("sliderContent") content!:ElementRef;
  @Input() disableUserControll = true;

  @HostListener('window:resize')
  updadateContentSizerInSlider(){
    this.sliderservice.childBoxWitdh = this.content.nativeElement.children[0]?.offsetWidth || 0;
    this.childBoxWitdh = this.sliderservice.childBoxWitdh
  }

  @HostListener('document:keydown', ["$event"])
  blockKeyboardScrolling(event: KeyboardEvent){
    const scrollKeys = [
      'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown' 
    ];

    if (scrollKeys.includes(event.key) && this.disableUserControll) {
      event.preventDefault();
    }
  }

  ngOnInit(){
    setTimeout(() => {
      this.updadateContentSizerInSlider()
      this.sliderservice.content = this.content
    }, 0);
  }

}
