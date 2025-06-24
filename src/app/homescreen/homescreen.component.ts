import { Component } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { Router} from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { ValidationHelperClass } from '../../service/ValidationHelperClass';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-homescreen',
  imports: [IconComponent, FooterNavigationComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './homescreen.component.html',
  styleUrl: './homescreen.component.scss'
})
export class HomescreenComponent {

  validation!: ValidationHelperClass;
  emailForm!: FormGroup;
  constructor( private form: FormBuilder, private router: Router, private api:ApiService, private auth:AuthService){
      this.emailForm = this.form.nonNullable.group({
        email: ['', [Validators.required, Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]],
      });
  
      this.validation = new ValidationHelperClass(this.emailForm, {})
    }

    routerToSignUp(){
      this.router.navigate(['./sign_up/form'], { queryParams: { email: this.emailForm.value.email } });
    }

   async ngOnInit(){
      this.auth.authStatus$.subscribe((status)=>{
        if (status) this.router.navigate(['./media']);
      });
    }

}
