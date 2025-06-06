import { Component,ViewChild,ElementRef, HostListener } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink, ActivatedRoute, Router} from '@angular/router';
import { enableIsScrollAbleAnimtion } from './scrollbar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, Location} from '@angular/common';
import { ValidationHelperClass } from '../../../service/ValidationHelperClass';
import { passwordsMatchValidator } from '../../custom-validators/password-missmatch';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [IconComponent,  RouterLink, CommonModule, ReactiveFormsModule ],
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss', './show-scroolable.scss']
})
export class SignUpFormComponent {

  readonly MIN_PASSWORD_LENGTH = 8;
  validation!: ValidationHelperClass;
  signUpForm!: FormGroup;
  fieldTypeIsPassword:boolean = true
  loginFailed:boolean = false

  constructor( private form: FormBuilder, private route: ActivatedRoute, private location: Location, private api:ApiService, public router: Router){
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
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.checkScrollbar()
  }

  checkForUrlParams(){
    this.route.queryParams.subscribe(params => {
      const email = params['email'] || '';
      this.signUpForm.patchValue({ email });
      this.location.replaceState('/sign_up');
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeated = form.get('repeatedPassword')?.value;
    return password === repeated ? null : { passwordMismatch: true };
  }

  changePasswordFieldType(){
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword
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

  ngOnInit(){
    this.checkForUrlParams()
  }

  async sendSignUp(event:Event){
      event.preventDefault()
      const signUpForm = JSON.parse(JSON.stringify(this.signUpForm.value))
      const requestData = { 
        email : signUpForm.email,
        username : signUpForm.username,
        password : signUpForm.password,
        repeated_password : signUpForm.repeatedPassword
      }
      const response = await this.api.regist(requestData);
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
