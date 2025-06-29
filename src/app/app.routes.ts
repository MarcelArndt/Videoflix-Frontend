import { Routes } from '@angular/router';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpFormComponent } from './sign-up/sign-up-form/sign-up-form.component';
import { SendConfirmEmailComponent } from './sign-up/send-confirm-email/send-confirm-email.component';
import { ValidatedMailComponent } from './sign-up/validated-mail/validated-mail.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordFormComponent } from './forgot-password/forgot-password-form/forgot-password-form.component';
import { ForgotPasswordCheckMailComponent } from './forgot-password/forgot-password-check-mail/forgot-password-check-mail.component';
import { ForgotPasswordResetComponent } from './forgot-password/forgot-password-reset/forgot-password-reset.component';
import { ResetPasswordValidComponent } from './forgot-password/reset-password-valid/reset-password-valid.component';
import { MediaCenterComponent } from './media-center/media-center.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
 
export const routes: Routes = [
    { path: '', component: HomescreenComponent },
    { path: 'home', component: HomescreenComponent },
    { path: 'sign_in', component: SignInComponent },
    { path: 'impressum', component: ImpressumComponent},
    { path: 'data-protection', component:  DatenschutzComponent},
    { path: 'sign_up', component:  SignUpComponent, children: [
        { path: '', redirectTo: 'form', pathMatch: 'full' },
        { path: 'form', component: SignUpFormComponent },
        { path: 'confirm', component: SendConfirmEmailComponent },
        { path: 'validated', component: ValidatedMailComponent }
    ] },
    { path: 'forgot_pw', component:  ForgotPasswordComponent , children: [
        { path: '', redirectTo: 'form', pathMatch: 'full' },
        { path: 'form', component: ForgotPasswordFormComponent },
        { path: 'confirm', component: ForgotPasswordCheckMailComponent },
        { path: 'reset-password', component: ForgotPasswordResetComponent },
        { path: 'validated', component: ResetPasswordValidComponent }
    ] },
    {path: 'media', component: MediaCenterComponent },
    {path: 'video', component: VideoplayerComponent },
    { path: '**', redirectTo: 'home' }

];
