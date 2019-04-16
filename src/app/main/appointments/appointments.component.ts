import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  patientInfo: any;
  departments: any[];
  doctors: any[];

  constructor() {
    this.patientInfo = {};
    this.departments = [];
    this.doctors = [];
  }

  ngOnInit() {
    this.patientInfo = {
      name: 'Essa Abid',
      age: 23,
      mob_number: '03439295108',
    }

    this.departments = ['Cardiology', 'Dental', 'Surgury', 'Pythologoy'];
    this.doctors = ['Farid ullah', 'Dilawer khan', 'Essa'];
  }

}
