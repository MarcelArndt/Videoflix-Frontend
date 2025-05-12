import { Component } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { RouterLink } from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';

@Component({
  selector: 'app-sign-in',
  imports: [IconComponent, RouterLink, FooterNavigationComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  fieldTypeIsPassword:boolean = true

  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword
  }

}
