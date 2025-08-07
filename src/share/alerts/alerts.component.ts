import { Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { AlertsService } from './alerts.service';

@Component({
  selector: 'alerts',
  imports: [IconComponent, CommonModule ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss'
})

export class AlertsComponent {
  constructor(public service: AlertsService){}
  @Input()animationDuration:number = 0;
  @Input()messageLifetime:number = 3000;
  @ViewChild('alert')alert!:ElementRef;

  ngAfterViewInit(){
    if(this.alert){
      this.alert.nativeElement.style.setProperty('--alter-animation-duration', `${this.animationDuration}ms`);
      this.service.init(this.alert, {'messageLifetime':this.messageLifetime, 'message':null, animationDuration:this.animationDuration});
    }
  }

  get isOpen():boolean{
    return this.service.alertSatus();
  }

  close(event:Event){
    event.preventDefault()
    this.service.close()
  }




}
