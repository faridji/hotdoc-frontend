import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MaterialComponentsModule } from "./material-components/material-components.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DoctorsComponent } from "./doctors/doctors.component";
import { DepartmentsComponent } from "./departments/departments.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { AboutComponent } from "./about/about.component";
@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    DepartmentsComponent,
    AppointmentsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialComponentsModule,
    RouterModule.forRoot([
      { path: "home", component: AppComponent },
      { path: "doctors", component: DoctorsComponent },
      { path: "departments", component: DepartmentsComponent },
      { path: "appointments", component: AppointmentsComponent },
      { path: "about", component: AboutComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
