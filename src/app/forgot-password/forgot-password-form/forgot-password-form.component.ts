import { Component } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ValidationHelperClass } from '../../../service/ValidationHelperClass';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-forgot-password-form',
  imports: [IconComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss'
})
export class ForgotPasswordFormComponent {

  validation!: ValidationHelperClass;
  forgotPwForm!: FormGroup;
  constructor( private form: FormBuilder){
      this.forgotPwForm = this.form.nonNullable.group({
        email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
      });
  
      this.validation = new ValidationHelperClass(this.forgotPwForm, {})
    }

}
