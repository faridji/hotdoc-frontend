import { Injectable } from '@angular/core';
import { GenericApiService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DoctorService extends GenericApiService{
  constructor(http: HttpClient) {
    super(http, 'http://localhost:3000/api/Doctors')
  }
}