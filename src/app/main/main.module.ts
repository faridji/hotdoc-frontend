import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DepartmentsComponent } from './departments/departments.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MaterialModule } from '../material-components/material-components.module';
import { LayoutComponent } from './layout/layout.component';
import { DoctorDetailComponent } from './doctors/detail/detail.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { patientAuthGuard } from '../shared/services/patientAuthGuard.service';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes =  [
  { path: '', redirectTo: 'home', pathMatch:'full' },

  { path: "home", component: HomeComponent },
  { path: "doctors", component: DoctorsComponent },
  { path: "doctors/:id", component: DoctorDetailComponent},
  { path: "departments", component: DepartmentsComponent },
  { path: "appointments", component: AppointmentsComponent, canActivate: [patientAuthGuard] },
  { path: "about", component: AboutComponent },
]

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    DoctorsComponent,
    DoctorDetailComponent,
    LayoutComponent,
    DepartmentsComponent,
    AppointmentsComponent,
    HeaderComponent,
    SidenavListComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],

  exports: [
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    FooterComponent,
  ]
})
export class MainModule { }
