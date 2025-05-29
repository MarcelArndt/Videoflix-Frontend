import { ElementRef } from "@angular/core";

export function enableIsScrollAbleAnimtion(elment:ElementRef , amountOfLoops:number = 3){
    const traget = elment.nativeElement
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