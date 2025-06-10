import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { RouterLink, Router } from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';
import { ValidationHelperClass } from '../../service/ValidationHelperClass';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { enableIsScrollAbleAnimtion } from '../sign-up/sign-up-form/scrollbar';

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
    this.checkScrollbar()
  }

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
      if(response.ok){
        this.routerToMedia(response.data.token, response.data.user_id)
      } else {
        this.loginFailed = true
      }
  }

  routerToMedia(token:string, userId:string){
    this.router.navigate(['/media']);
  }

  ngOnInit(){
    this.api.isUserAlreadyLoggedIn()
  }

  ngAfterViewInit(){
    this.checkScrollbar()
  }

 checkScrollbar(){
  console.log('start')
      const barHeight = this.scrollbar.nativeElement.offsetHeight;
      const refHeight= document.documentElement.clientHeight;
      if (refHeight / 2 < barHeight){
        enableIsScrollAbleAnimtion(this.scrollAnimtion)
    }
  }

}
