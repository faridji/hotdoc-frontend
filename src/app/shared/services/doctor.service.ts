import { Injectable } from '@angular/core';
import { GenericApiService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DoctorService extends GenericApiService{

  doctor_data: BehaviorSubject<any>;
  constructor(http: HttpClient) {
    super(http, 'https://hotdocv1-0.herokuapp.com/api/Doctors');

    this.doctor_data = new BehaviorSubject(null);
  }
}