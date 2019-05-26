import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: any;
  loading: boolean;

  constructor(private router: Router, private doctorService: DoctorService) { 
    this.doctors = [];
    this.loading = false;
  }

  ngOnInit() {
    this.loading = true;
    this.doctorService.getAll().subscribe( resp => {
      this.loading = false;
      this.doctors = resp;

    }, (error : HttpErrorResponse) => {
      this.loading = false;
      AlertsService.error('Error', error.message);
    });
  }
}
