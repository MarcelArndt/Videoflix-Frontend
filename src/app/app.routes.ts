import { Routes } from '@angular/router';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    { path: '', component: HomescreenComponent },
    { path: 'sign_in', component: SignInComponent },
];
