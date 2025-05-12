import { Component } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { RouterLink } from '@angular/router';
import { FooterNavigationComponent } from '../footer-navigation/footer-navigation.component';


@Component({
  selector: 'app-homescreen',
  imports: [IconComponent, RouterLink, FooterNavigationComponent],
  templateUrl: './homescreen.component.html',
  styleUrl: './homescreen.component.scss'
})
export class HomescreenComponent {

}
