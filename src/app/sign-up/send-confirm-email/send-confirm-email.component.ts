import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { checkScrollbar } from '../../../service/scrollbar';
import { Location } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import { RESEND_EMAIL } from '../../../service/config';
import { AlertsService } from '../../../share/alerts/alerts.service';
import { AuthService } from '../../../service/auth.service';
@Component({
  selector: 'app-send-confirm-email',
  imports: [IconComponent, RouterLink ],
  templateUrl: './send-confirm-email.component.html',
  styleUrls: ['./send-confirm-email.component.scss', "./../sign-up-form/show-scroolable.scss"]
})
export class SendConfirmEmailComponent {
  constructor(private route: ActivatedRoute, private location: Location, private api:ApiService, private alert: AlertsService, private router: Router, private auth: AuthService  ){}

  private userId:string = ""

  @ViewChild('scrollbar')scrollbar!:ElementRef;
  @ViewChild('scrollAnimtion')scrollAnimtion!:ElementRef;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    checkScrollbar(this.scrollbar, this.scrollAnimtion)
  }

  ngAfterViewInit(){
    checkScrollbar(this.scrollbar, this.scrollAnimtion)
  }

  async sendEmailAgain(){
    const response = await this.api.post(RESEND_EMAIL);
    if (response) this.alert.setAlert('E-Mail was sent',false);
  }

  sendBackToStart(){
    this.auth.logout();
  }




}
