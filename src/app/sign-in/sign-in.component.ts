import { Component } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { RouterLink, Router } from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';
import { ValidationHelperClass } from '../../service/ValidationHelperClass';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-sign-in',
  imports: [IconComponent, RouterLink, FooterNavigationComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  fieldTypeIsPassword:boolean = true
  validation!: ValidationHelperClass;
  readonly MIN_PASSWORD_LENGTH = 8;
  signInForm!: FormGroup;
  loginFailed:boolean = false

  constructor( private form: FormBuilder, private api: ApiService, private router:Router){
    this.signInForm = this.form.nonNullable.group({
      email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
      password: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
    });

    this.validation = new ValidationHelperClass(this.signInForm, {'MIN_PASSWORD_LENGTH':this.MIN_PASSWORD_LENGTH})
  }

  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword
  }

  async sendSignIn(event:Event){
    event.preventDefault();
    const loginForm = {
      'email': JSON.parse(JSON.stringify(this.signInForm.value.email)) as string,
      'password' : JSON.parse(JSON.stringify(this.signInForm.value.password)) as string,
    };
  const response = await this.api.login(loginForm);
      console.log(response)
      if(response.ok){
        this.routerToMedia()
      } else {
        this.loginFailed = true
      }
  }

  routerToMedia(){
    this.router.navigate(['/media']);
  }

}
