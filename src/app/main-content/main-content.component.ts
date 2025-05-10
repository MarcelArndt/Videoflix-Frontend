import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-content',
  imports: [HeadlineComponent, RouterOutlet ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
