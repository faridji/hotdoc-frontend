import { Injectable } from '@angular/core';
import { GenericApiService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PatientService extends GenericApiService{
  constructor(http: HttpClient) {
    super(http, 'https://hotdocv1-0.herokuapp.com/api/Patients');
  }
}