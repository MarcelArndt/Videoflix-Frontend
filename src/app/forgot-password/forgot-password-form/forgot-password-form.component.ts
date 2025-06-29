import { Component } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ValidationHelperClass } from '../../../service/ValidationHelperClass';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api.service';
import { AlertsService } from '../../../share/alerts/alerts.service';
import { FIND_USER_RESET_PASSWORD } from '../../../service/config';



@Component({
  selector: 'app-forgot-password-form',
  imports: [IconComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent {

  validation!: ValidationHelperClass;
  sendEmailFail:boolean = false;
  forgotPwForm!: FormGroup;
  constructor( private form: FormBuilder, private api: ApiService, private router: Router, private alert:AlertsService){
      this.forgotPwForm = this.form.nonNullable.group({
        email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
      });
  
      this.validation = new ValidationHelperClass(this.forgotPwForm, {})
    }
    resetPasswordFailed:boolean = false


    async sendEmail(event:Event){
    event.preventDefault()
    const forgotPwForm = JSON.parse(JSON.stringify(this.forgotPwForm.value))
    const requestData = { 
      email : forgotPwForm.email,
    }
    const response = await this.api.post(FIND_USER_RESET_PASSWORD,requestData);
    console.log(response)
    if(response){
      this.alert.setAlert('Mail sent to reset password', false);
      this.routerToCheckMail()
    } else {
      this.sendEmailFail = true;
      this.resetPasswordFailed = true
    }
  }

  routerToCheckMail(){
      this.router.navigate(['forgot_pw/confirm']);
  }

}
