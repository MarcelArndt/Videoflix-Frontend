import { Component } from '@angular/core';
import { HeadlineComponent } from '../headline/headline.component';
import { RouterOutlet } from '@angular/router';
import { AlertsComponent } from '../../share/alerts/alerts.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-main-content',
  imports: [HeadlineComponent, RouterOutlet, AlertsComponent ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

  constructor(private auth: AuthService) {}

  async ngOnInit() {

}

}
