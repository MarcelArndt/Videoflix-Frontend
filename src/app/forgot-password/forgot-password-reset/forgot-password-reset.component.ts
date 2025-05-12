import { Component } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password-reset',
  imports: [ IconComponent, RouterLink ],
  templateUrl: './forgot-password-reset.component.html',
  styleUrl: './forgot-password-reset.component.scss'
})
export class ForgotPasswordResetComponent {
  fieldTypeIsPassword:boolean = true

  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword
  }
}
