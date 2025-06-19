import { ElementRef } from "@angular/core";

function enableIsScrollAbleAnimtion(element:ElementRef , amountOfLoops:number = 3){
    const traget = element.nativeElement
    const durationTimer = traget.getAttribute('animation-duration') || '1s';
    const LoopsInTimer = parseFloat(durationTimer.substr(0, durationTimer.length - 1)) * 1000 * amountOfLoops
    traget.classList.remove('display-off');
    traget.style.setProperty('--animation-duration', durationTimer);
    traget.classList.add('animation');
    setTimeout(() => {
        traget.classList.remove('animation');
        traget.classList.add('display-off');
    }, LoopsInTimer)
}

export function checkScrollbar(boxElement:ElementRef, scrollElement:ElementRef,){
    const element = boxElement.nativeElement;
    const parentElement = boxElement.nativeElement.parentElement
    let parentElementHeight = 0
    let elementInnerHeight = 0
    if (parentElement && element) {
      parentElementHeight = parentElement.getBoundingClientRect().height;
      elementInnerHeight = element.getBoundingClientRect().height;
    }
    const elementouterHight = boxElement.nativeElement.clientHeight;
    const refHeight = document.documentElement.clientHeight;
    if (refHeight / 2 < elementouterHight || parentElementHeight < elementInnerHeight){
      enableIsScrollAbleAnimtion(scrollElement)
    }
  }