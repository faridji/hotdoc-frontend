import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { MaterialModule } from '../material-components/material-components.module';

const routes: Routes =  [
  { path: '', redirectTo: 'admin', pathMatch:'full' },

  { path: "admin", component: AdminpanelComponent },
  { path: "doctors", component: DoctorsListComponent },
  { path: "categories", component: CategoriesListComponent },
  { path: "patients", component: PatientListComponent },

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
