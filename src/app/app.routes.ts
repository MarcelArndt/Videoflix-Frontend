import { Routes } from '@angular/router';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpFormComponent } from './sign-up/sign-up-form/sign-up-form.component';
import { SendConfirmEmailComponent } from './sign-up/send-confirm-email/send-confirm-email.component';
import { ValidatedMailComponent } from './sign-up/validated-mail/validated-mail.component';

export const routes: Routes = [
    { path: '', component: HomescreenComponent },
    { path: 'sign_in', component: SignInComponent },
    { path: 'sign_up', component:  SignUpComponent, children: [
        { path: '', redirectTo: 'form', pathMatch: 'full' },
        { path: 'form', component: SignUpFormComponent },
        { path: 'confirm', component: SendConfirmEmailComponent },
        { path: 'validated', component: ValidatedMailComponent }
    ] },
];
