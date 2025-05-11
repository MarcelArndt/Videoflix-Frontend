import { Component } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-send-confirm-email',
  imports: [IconComponent, RouterLink ],
  templateUrl: './send-confirm-email.component.html',
  styleUrl: './send-confirm-email.component.scss'
})
export class SendConfirmEmailComponent {

}
