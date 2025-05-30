import { Component } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';

@Component({
  selector: 'app-datenschutz',
  imports: [ IconComponent],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.scss'
})
export class DatenschutzComponent {
  backToButton(){
    history.back()
  }
}
