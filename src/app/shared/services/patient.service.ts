import { Injectable } from '@angular/core';
import { GenericApiService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PatientService extends GenericApiService{

  url: string = "https://hotdocv1-0.herokuapp.com/api/Patients";
  constructor(protected http: HttpClient) {
    super(http, "https://hotdocv1-0.herokuapp.com/api/Patients");
  }

  makeAppointment(postData: any) {
    return this.http.post(this.url + '/makeAppointment', postData);
  }
}