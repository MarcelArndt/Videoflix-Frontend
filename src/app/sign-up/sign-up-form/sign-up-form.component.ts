import { Component } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sign-up-form',
  imports: [IconComponent,  RouterLink ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  fieldTypeIsPassword:boolean = true

  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword
  }
}
