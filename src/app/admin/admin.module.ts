import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { MaterialModule } from '../material-components/material-components.module';
import { adminAuthGuard } from '../shared/services/adminAuthGuard.service';
import { DoctorFormComponent } from './components/doctor-form/doctor.form';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeptListComponent } from './components/dept-list/dept-list.component';
import { DepartmentFormComponent } from './components/dept-form/doctor.form';

const routes: Routes =  [
  { path: "admin", component: AdminpanelComponent, canActivate: [adminAuthGuard] },
  { path: "dashboard", component: DashboardComponent, canActivate: [adminAuthGuard]},
  { path: "all_doctors", component: DoctorsListComponent, canActivate: [adminAuthGuard] },
  { path: "departments", component: DeptListComponent, canActivate: [adminAuthGuard]},
  { path: "patients", component: PatientListComponent, canActivate: [adminAuthGuard] },

]


@NgModule({
  declarations: [
    DashboardComponent,
    AdminpanelComponent, 

    DoctorsListComponent,
    PatientListComponent,
    DeptListComponent,

    DoctorFormComponent,
    DepartmentFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [DoctorFormComponent, DepartmentFormComponent]
})
export class AdminModule { }
