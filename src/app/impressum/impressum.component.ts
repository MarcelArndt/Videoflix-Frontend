import { Component ,HostListener } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';

@Component({
  selector: 'app-impressum',
  imports: [IconComponent],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

  backToButton(){
    history.back()
  }

}
