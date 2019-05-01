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


  constructor(private router: Router, private doctorService: DoctorService) { 
    this.doctors = [];
  }

  ngOnInit() {
    this.doctorService.getAll().subscribe( resp => {
      console.log('Resp -> ', resp);
      this.doctors = resp;

    }, (error : HttpErrorResponse) => {
      AlertsService.error('Error', error.message);
    });
  }

  doctorDetail(id: string) {
    this.router.navigate(['doctors', id])
  }

}
