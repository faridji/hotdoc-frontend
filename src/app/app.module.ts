import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MaterialComponentsModule } from "./material-components/material-components.module";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DoctorsComponent } from "./doctors/doctors.component";
import { DepartmentsComponent } from "./departments/departments.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { AboutComponent } from "./about/about.component";
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

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
    AppComponent,
    DoctorsComponent,
    DepartmentsComponent,
    AppointmentsComponent,
    AboutComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialComponentsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
