import { Injectable, Type, ElementRef } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupServiceService {

  constructor() { }
  currentComponentSource = new BehaviorSubject<Type<any> | null>(null);
  nextComponent$ = this.currentComponentSource.asObservable();
  isPopUpOpen: boolean = false;
  firstTimeopen: boolean = true;
  popUp!:ElementRef;
  animationDuration:number = 0

  TogglePopUpValues() {
    this.firstTimeopen = false;
    this.isPopUpOpen = !this.isPopUpOpen;
  }

  popUpInit(popUpElement:ElementRef, animationDuration:number){
    this.popUp = popUpElement
    this.animationDuration = animationDuration
  }

  openPopUp(component:Type<any>){
    this.popUp.nativeElement.style.display = '';
    this.firstTimeopen = false;
    this.isPopUpOpen = true;
    this.currentComponentSource.next(component);
  }

  switchToNextComponent(component:Type<any>){
    this.popUp.nativeElement.style.display = '';
    this.currentComponentSource.next(component);
  }

  closePopUp() {
    this.isPopUpOpen = false;
    this.firstTimeopen = false;
    setTimeout(() => {
      if(!this.isPopUpOpen && this.popUp){
      this.popUp.nativeElement.style.display = 'none';
      }
    },this.animationDuration)
  }
}
