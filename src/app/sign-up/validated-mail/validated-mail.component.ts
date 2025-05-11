import { Component } from '@angular/core';
import { IconComponent } from '../../../share/icon/icon.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-validated-mail',
  imports: [IconComponent, RouterLink],
  templateUrl: './validated-mail.component.html',
  styleUrl: './validated-mail.component.scss'
})
export class ValidatedMailComponent {

}
