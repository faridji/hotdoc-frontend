import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginMainPageComponent } from './login-main-page/login-main-page.component';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { PatientSignInComponent } from './patient-sign-in/patient-sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MaterialModule } from '../material-components/material-components.module';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'login-main-page', component: LoginMainPageComponent },
  { path: 'admin-sign-in', component: AdminSignInComponent },
  { path: 'patient-sign-in', component: PatientSignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forget-password', component: ForgotPasswordComponent }
]

@NgModule({
  declarations: [
    SignUpComponent, 
    LoginMainPageComponent,
    AdminSignInComponent,
    PatientSignInComponent, 
    ForgotPasswordComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,

    RouterModule.forChild(routes),
  ],

  exports: [
    SignUpComponent, 
    LoginMainPageComponent,
    AdminSignInComponent,
    PatientSignInComponent, 
    ForgotPasswordComponent
  ]
})
export class MembershipModule { }
