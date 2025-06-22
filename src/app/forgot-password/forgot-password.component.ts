import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterOutlet, FooterNavigationComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  constructor(private api:ApiService){}
}
