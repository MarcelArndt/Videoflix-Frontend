import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { RouterLink, Router } from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';
import { ValidationHelperClass } from '../../service/ValidationHelperClass';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { checkScrollbar } from '../../service/scrollbar';
import { AlertsService } from '../../share/alerts/alerts.service';
import { AuthService } from '../../service/auth.service';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-sign-in',
  imports: [IconComponent, RouterLink, FooterNavigationComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', './../sign-up/sign-up-form/show-scroolable.scss']
})
export class SignInComponent {

  @ViewChild('scrollbar')scrollbar!:ElementRef;
  @ViewChild('scrollAnimtion')scrollAnimtion!:ElementRef;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    checkScrollbar(this.scrollbar, this.scrollAnimtion)
  }

  fieldTypeIsPassword:boolean = true
  validation!: ValidationHelperClass;
  readonly MIN_PASSWORD_LENGTH = 8;
  signInForm!: FormGroup;
  loginFailed:boolean = false;

  constructor( private form: FormBuilder, private api: ApiService, private router:Router, private alert:AlertsService, private auth:AuthService){
    this.signInForm = this.form.nonNullable.group({
      email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
      password: ['', [Validators.required, Validators.minLength(this.MIN_PASSWORD_LENGTH)]],
    });

    this.validation = new ValidationHelperClass(this.signInForm, {'MIN_PASSWORD_LENGTH':this.MIN_PASSWORD_LENGTH});
  }

  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword;
  }

  async sendSignIn(event:Event){
    event.preventDefault();
    const loginObject = {
      'email': JSON.parse(JSON.stringify(this.signInForm.value.email)) as string,
      'password' : JSON.parse(JSON.stringify(this.signInForm.value.password)) as string,
    };
    const res = await this.auth.login(loginObject);
    if(res){
      this.alert.setAlert('Sign-In was successful', false);
      setTimeout(()=>{
        this.routerToMedia();
      },1750);

    } else {
      this.loginFailed = true;
    }
  }

  routerToMedia(){
    this.router.navigate(['/media']);
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
    checkScrollbar(this.scrollbar, this.scrollAnimtion);
  }

  resetLoginFailed(){
    if (!this.loginFailed) return
     this.loginFailed = false;
  }

}
