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


const routes: Routes =  [
  { path: '', redirectTo: 'home', pathMatch:'full' },

  { path: "home", component: HomeComponent },
  { path: "doctors", component: DoctorsComponent },
  { path: "departments", component: DepartmentsComponent },
  { path: "appointments", component: AppointmentsComponent },
  { path: "about", component: AboutComponent },

  { path: '**', redirectTo: 'home', }
]

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    DoctorsComponent,
    LayoutComponent,
    DepartmentsComponent,
    AppointmentsComponent,
    HeaderComponent,
    SidenavListComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],

  exports: [
    HomeComponent,
    AboutComponent,
    LayoutComponent,
    DoctorsComponent,
    DepartmentsComponent,
    AppointmentsComponent,
    HeaderComponent,
    SidenavListComponent,
  ]
})
export class MainModule { }
