import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videoupload-loading-screen',
  imports: [CommonModule],
  templateUrl: './videoupload-loading-screen.component.html',
  styleUrl: './videoupload-loading-screen.component.scss'
})
export class VideouploadLoadingScreenComponent {
@Input()uploadProcess:number = 0
}
