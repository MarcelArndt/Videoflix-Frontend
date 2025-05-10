import { Injectable, ElementRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor() { }

  content!:ElementRef;
  childBoxWitdh = 0;

  slideto(childBoxByElementIndex:number){
    setTimeout(()=>{
      const targetElement = this.content.nativeElement.children[childBoxByElementIndex]
      const allElements = this.content.nativeElement.children
      Array.from(allElements as HTMLElement[]).forEach((obj: HTMLElement, index: number) => {
        if (index == childBoxByElementIndex){
          obj.classList.add("fadeOn");
          obj.classList.remove("fadeOnff");
        } else {
          obj.classList.add("fadeOff");
          obj.classList.remove("fadeOn");
        }
      });
      if(targetElement){
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    },0)
  }
}
