import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginMainPageComponent } from './login-main-page/login-main-page.component';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { PatientSignInComponent } from './patient-sign-in/patient-sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MaterialModule } from '../material-components/material-components.module';

@NgModule({
  declarations: [
    SignUpComponent, 
    LoginMainPageComponent,
    AdminSignInComponent,
    PatientSignInComponent, 
    ForgotPasswordComponent],
  imports: [
    CommonModule,

    MaterialModule,
  ]
})
export class MembershipModule { }
