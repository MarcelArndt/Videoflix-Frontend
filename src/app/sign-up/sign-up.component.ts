import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterOutlet, FooterNavigationComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private api:ApiService){}

  ngOnInit(){

  }
}
