import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { Router, NavigationStart, NavigationError } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-root',
  imports: [MainContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoflix';


// Debug Router
/*
constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      console.log('Navigation starts to:', event.url);
      console.log('Navigation ID:', event.id);
      
      // Stack trace, um zu sehen, woher der Aufruf kommt
      if (event.url === '/%20') {
        console.trace('Found the problematic navigation!');
      }
    }
    if (event instanceof NavigationError) {
      console.error('Navigation error:', event);
    }
  }); 
}
*/
  
}
