import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/shared/services/dept.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  departments: any;
  doctors: any;

  treatment_type: any[];
  patientInfo: any;
  doctorInfo: any;

  theForm: FormGroup;

  today_date: Date;

  constructor(private deptService: DeptService,
              private doctorService: DoctorService,
              private authService: AuthService,
              private patientService: PatientService,
              private fb: FormBuilder) {
    this.patientInfo = {};
    this.departments = [];
    this.doctors = [];

    this.treatment_type = ['Face to Face', 'Online'];

    this.theForm = fb.group({

      doctor: ['', Validators.required],
      department: ['', Validators.required],
      date_of_appointment: ['', Validators.required],
      treatment_types: ['', Validators.required]
    });

    this.today_date = new Date();

    this.theForm.controls.treatment_types.setValue('Face to Face');
    this.theForm.controls.date_of_appointment.setValue(this.today_date);
  }

  ngOnInit() {

    // Subscribe to doctor info send from doctor Detail page;
    this.doctorService.doctor_data.subscribe( resp => {
      this.doctorInfo = resp;
      
      if (this.doctorInfo)
      {
        this.theForm.controls.doctor.setValue(this.doctorInfo.name);
        this.theForm.controls.department.setValue(this.doctorInfo.dept);
      }
    });

    this.deptService.getAll().subscribe(resp => {
      this.departments = resp;
    });

    this.doctorService.getAll().subscribe(resp => {
      this.doctors = resp;
    });
    
    const currentUser = this.authService.getCurrentUser();
    this.patientService.get(currentUser._id).subscribe(resp => {
      this.patientInfo = resp;
    });
  }

  onDateSelected(ev: MatDatepickerInputEvent<any>)
  {
    const date = new Date(ev.value).getTime() / 1000;
    this.theForm.controls.date_of_appointment.setValue(date);
  }

  makeAppointment()
  {
    this.patientService.makeAppointment(this.theForm.value).subscribe( resp => {
      console.log(resp);
    }, (error: HttpErrorResponse) => {
      
      AlertsService.error('Server Error', error.message);
    });
  }

}
