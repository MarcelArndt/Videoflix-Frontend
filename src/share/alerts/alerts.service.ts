import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface option {
  message:string|null,
  messageLifetime:number|null,
  animationDuration:number|0
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  element!:ElementRef;

  constructor() { }

  private messageSubject = new BehaviorSubject<string>('');
  public message$ = this.messageSubject.asObservable();
  public isOpen:boolean = false;
  private currentLifeTimer!:any;
  private messageLifetime:number = 0;
  private animationDuration:number = 0;
  private isErrorSubject = new BehaviorSubject<boolean>(true);
  public MessageIsError$ = this.isErrorSubject.asObservable();


  init(element:ElementRef, options:option = {message:null, messageLifetime:null, animationDuration:0}){
    this.element = element;
    this.element.nativeElement.style.opacity = "0";
    if(options.message) this.messageSubject.next(options.message);
    if(options.messageLifetime) this.messageLifetime = options.messageLifetime;
    if(options.animationDuration) this.animationDuration = options.animationDuration;
  }

  setAlert(message="", isErrorType=true){
    this.element.nativeElement.style.opacity = "1";
    this.checkCurrentTimeOut();
    this.isErrorSubject.next(isErrorType);
    this.messageSubject.next(message);
    this.isOpen = true
    this.currentLifeTimer = setTimeout(()=>{  
      this.isOpen = false;
      setTimeout(()=>{
       this.element.nativeElement.style.opacity = "0";
      }, this.animationDuration);
    },this.messageLifetime);
  }

  checkCurrentTimeOut(){
    if(this.currentLifeTimer){
      clearTimeout(this.currentLifeTimer);
    }
  }

  alertSatus():boolean{
    return this.isOpen
  }

  close(){
     this.isOpen = false
  }


}


