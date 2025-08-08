import { Component,ViewChild,ElementRef, HostListener } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { ActivatedRoute, Router} from '@angular/router';
import { checkScrollbar } from '../../../service/scrollbar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule, Location} from '@angular/common';
import { ValidationHelperClass } from '../../../service/ValidationHelperClass';
import { passwordsMatchValidator } from '../../custom-validators/password-missmatch';
import { ApiService } from '../../../service/api.service';
import { MIN_PASSWORD_LENGHT } from '../../../../config';
import { AlertsService } from '../../../share/alerts/alerts.service';
import { REGISTRATION_URL } from '../../../../config';
import { Response } from '../../../interface/interface';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-sign-up-form',
  imports: [IconComponent, CommonModule, ReactiveFormsModule ],
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss', './show-scroolable.scss']
})
export class SignUpFormComponent {

  readonly MIN_PASSWORD_LENGTH = 8;
  validation!: ValidationHelperClass;
  signUpForm!: FormGroup;
  fieldTypeIsPassword:boolean = true
  registFailed:boolean = false

  constructor( private form: FormBuilder, private route: ActivatedRoute, private location: Location, private api:ApiService, public router: Router, private alert:AlertsService, private auth:AuthService){
    this.signUpForm = this.form.nonNullable.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
      password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGHT)]],
      repeatedPassword: ['', [Validators.required]]
    }, {
      validators: passwordsMatchValidator 
    });

    this.validation = new ValidationHelperClass(this.signUpForm, {'MIN_PASSWORD_LENGTH':MIN_PASSWORD_LENGHT})
  }

  @ViewChild('scrollbar')scrollbar!:ElementRef;
  @ViewChild('scrollAnimtion')scrollAnimtion!:ElementRef;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    checkScrollbar(this.scrollbar, this.scrollAnimtion)
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
    this.fieldTypeIsPassword = !this.fieldTypeIsPassword;
  }


  ngAfterViewInit(){
    checkScrollbar(this.scrollbar, this.scrollAnimtion);
  }

  ngOnInit(){
    this.checkForUrlParams();
  }


  async sendSignUp(event:Event){
      event.preventDefault();
      const signUpForm = JSON.parse(JSON.stringify(this.signUpForm.value));
      const requestData = { 
        email : signUpForm.email,
        username : signUpForm.username,
        password : signUpForm.password,
        repeated_password : signUpForm.repeatedPassword
      }
      const response = await this.api.post(REGISTRATION_URL,requestData) as Response;
      if(response){
        this.alert.setAlert('Account successfully created', false);
        await this.login(requestData);
      } else {
        this.registFailed = true;
      }
    }


    async login(requestData:{email:string, password:string} & Record<string, any>){
      const loginObject = {
        'email': requestData.email,
        'password': requestData.password,
      }
      const response = await this.auth.login(loginObject);
      if(response){
          this.router.navigate(['/media']);
      }
    }
}
