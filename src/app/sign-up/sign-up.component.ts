import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';

@Component({
  selector: 'app-sign-up',
  imports: [RouterOutlet, FooterNavigationComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

}
