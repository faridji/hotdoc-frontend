import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { MaterialModule } from '../material-components/material-components.module';
import { adminAuthGuard } from '../shared/services/adminAuthGuard.service';

const routes: Routes =  [
  { path: "admin", component: AdminpanelComponent, canActivate: [adminAuthGuard] },
  { path: "doctors", component: DoctorsListComponent, canActivate: [adminAuthGuard] },
  { path: "categories", component: CategoriesListComponent, canActivate: [adminAuthGuard]},
  { path: "patients", component: PatientListComponent, canActivate: [adminAuthGuard] },

]


@NgModule({
  declarations: [AdminpanelComponent, 
    DoctorsListComponent,
    CategoriesListComponent,
    PatientListComponent],


  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
