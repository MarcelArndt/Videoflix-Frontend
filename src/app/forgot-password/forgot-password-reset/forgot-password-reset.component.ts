import { Component } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ValidationHelperClass } from '../../../service/ValidationHelperClass';
import { MIN_PASSWORD_LENGHT } from '../../../service/config';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, Location} from '@angular/common';
import { passwordsMatchValidator } from '../../custom-validators/password-missmatch';
import { ApiService } from '../../../service/api.service';
import { AlertsService } from '../../../share/alerts/alerts.service';
import { RESET_PASSWORD } from '../../../service/config';

@Component({
  selector: 'app-forgot-password-reset',
  imports: [ IconComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password-reset.component.html',
  styleUrl: './forgot-password-reset.component.scss'
})
export class ForgotPasswordResetComponent {
  validation!: ValidationHelperClass;
  resetPasswordForm!: FormGroup;
  constructor( private form: FormBuilder, private activeRouter: ActivatedRoute, private api:ApiService, private router: Router, private alert: AlertsService){
      this.resetPasswordForm = this.form.nonNullable.group({
      password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGHT)]],
      repeatedPassword: ['', [Validators.required]]
    }, {
      validators: passwordsMatchValidator 
    });

    this.validation = new ValidationHelperClass(this.resetPasswordForm , {'MIN_PASSWORD_LENGTH':MIN_PASSWORD_LENGHT})
  }
  private token:string = "";
  private userId:string = "";
  setPasswordFailed:boolean = false;
  fieldTypeIsPassword:boolean = true


  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword
  }

  ngOnInit() {
    this.activeRouter.queryParamMap.subscribe(params => {
      this.token = params.get('token') || '';
      this.userId = params.get('user') || '';
    });
  }

   async sendResetPassword(event:Event){
      event.preventDefault()
      const resetPasswordForm = JSON.parse(JSON.stringify(this.resetPasswordForm.value))
      const requestData = { 
        userId : this.userId,
        token : this.token,
        password : resetPasswordForm.password,
        repeated_password : resetPasswordForm.repeatedPassword
      }
      const response = await this.api.post(RESET_PASSWORD,requestData);
      if(response){
        this.alert.setAlert('Password successfully recovered', false)
        this.routerToMedia()
      } else {
        this.setPasswordFailed = true
      }
    }

    
    routerToMedia(){
      this.router.navigate(['forgot_pw/validated']);
    }


}
