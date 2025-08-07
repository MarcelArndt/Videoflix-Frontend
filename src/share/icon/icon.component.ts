import { Component , Input} from '@angular/core';

@Component({
  selector: 'icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() id: string = '';
}
