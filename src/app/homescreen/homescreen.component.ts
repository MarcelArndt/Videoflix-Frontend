import { Component } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-homescreen',
  imports: [IconComponent, RouterLink],
  templateUrl: './homescreen.component.html',
  styleUrl: './homescreen.component.scss'
})
export class HomescreenComponent {

}
