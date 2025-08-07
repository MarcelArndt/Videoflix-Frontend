import { Component ,HostListener } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-impressum',
  imports: [IconComponent],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {

  constructor(private api: ApiService){}

  backToButton(){
    this.api.switchIsImpressum(false)
    history.back()
  }

}
