import { Component } from '@angular/core';
import { IconComponent } from '../../share/icon/icon.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-datenschutz',
  imports: [ IconComponent],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.scss'
})
export class DatenschutzComponent {
  constructor(private api:ApiService){}
  backToButton(){
    this.api.switchIsImpressum(false)
    history.back()
  }
}
