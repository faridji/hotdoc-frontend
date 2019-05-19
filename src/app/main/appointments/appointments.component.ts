import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/shared/services/dept.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  patientInfo: any;
  departments: any;
  doctors: any[];

  constructor(private deptService: DeptService,
              private authService: AuthService,
              private patientService: PatientService) {
    this.patientInfo = {};
    this.departments = [];
    this.doctors = [];
  }

  ngOnInit() {

    this.deptService.getAll().subscribe(resp => {
      this.departments = resp;
    });
    
    const currentUser = this.authService.getCurrentUser();
    this.patientService.get(currentUser._id).subscribe(resp => {
      this.patientInfo = resp;
    });

    this.doctors = ['Farid ullah', 'Dilawer khan', 'Essa'];
  }

}
