import { Component } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';

@Component({
  selector: 'app-sign-in',
  imports: [IconComponent ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  fieldTypeIsPassword:boolean = true

  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword
  }

}
