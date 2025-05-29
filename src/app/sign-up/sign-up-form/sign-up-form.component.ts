import { Component,ViewChild,ElementRef, HostListener } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';
import { enableIsScrollAbleAnimtion } from './scrollbar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationHelperClass } from '../../service/ValidationHelperClass';
import { passwordsMatchValidator } from '../../custom-validators/password-missmatch';

@Component({
  selector: 'app-sign-up-form',
  imports: [IconComponent,  RouterLink, CommonModule, ReactiveFormsModule ],
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss', './show-scroolable.scss']
})
export class SignUpFormComponent {

  readonly MIN_PASSWORD_LENGTH = 8;
  validation!: ValidationHelperClass;

  constructor( private form: FormBuilder){
    this.signUpForm = this.form.nonNullable.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
      password: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
      repeatedPassword: ['', [Validators.required]]
    }, {
      validators: passwordsMatchValidator 
    });

    this.validation = new ValidationHelperClass(this.signUpForm, {'MIN_PASSWORD_LENGTH':this.MIN_PASSWORD_LENGTH})
  }

  @ViewChild('scrollbar')scrollbar!:ElementRef;
  @ViewChild('scrollAnimtion')scrollAnimtion!:ElementRef;
  fieldTypeIsPassword:boolean = true
  signUpForm!: FormGroup;

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeated = form.get('repeatedPassword')?.value;
    return password === repeated ? null : { passwordMismatch: true };
  }

  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.checkScrollbar()
  }

  checkScrollbar(){
    const barHeight = this.scrollbar.nativeElement.offsetHeight;
    const refHeight= document.documentElement.clientHeight;
    if (refHeight / 2 < barHeight){
      console.log('scroll')
      enableIsScrollAbleAnimtion(this.scrollAnimtion)
    }
  }


  ngAfterViewInit(){
    this.checkScrollbar()
  }

}
