import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { checkScrollbar } from '../../../service/scrollbar';
import { Location } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import { SendEmail } from '../../../interface/interface';
@Component({
  selector: 'app-send-confirm-email',
  imports: [IconComponent, RouterLink ],
  templateUrl: './send-confirm-email.component.html',
  styleUrls: ['./send-confirm-email.component.scss', "./../sign-up-form/show-scroolable.scss"]
})
export class SendConfirmEmailComponent {
  constructor(private route: ActivatedRoute, private location: Location, private api:ApiService){}

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


  ngOnInit(){
    this.checkForUrlParams()
  }

  checkForUrlParams(){
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'] || '';
      this.location.replaceState('/confirm');
    });
  }

  sendEmailAgain(){
    const email_object:SendEmail = {
      "user_id": this.userId,
    }
    this.api.resendEmail(email_object)
  }




}
