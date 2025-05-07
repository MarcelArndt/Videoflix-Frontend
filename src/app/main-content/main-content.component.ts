import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';
import { HomescreenComponent } from '../homescreen/homescreen.component';

@Component({
  selector: 'app-main-content',
  imports: [HeadlineComponent, HomescreenComponent ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}
