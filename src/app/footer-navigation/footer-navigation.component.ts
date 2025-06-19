import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'footer-navigation',
  imports: [],
  templateUrl: './footer-navigation.component.html',
  styleUrl: './footer-navigation.component.scss'
})
export class FooterNavigationComponent {
  constructor(private api:ApiService, private router: Router){}

  sendto(sentTo:String){
  this.api.switchIsImpressum(true);
  this.router.navigate([`/${sentTo}`]);
  }

}
