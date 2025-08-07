import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VideoPlayerManagerService {

  constructor() {}

  isVideoModeSubject = new BehaviorSubject<boolean>(false);
  isVideoMode$ = this.isVideoModeSubject.asObservable()

  enableVideoMode(){
    this.isVideoModeSubject.next(true);
  }

  disableVideoMode(){
    this.isVideoModeSubject.next(false);
  }

}
