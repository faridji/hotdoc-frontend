import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotDocApiService {

  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:3000";
  }

  addPatient(postData: any) {
    return this.http.post(this.baseUrl + '/api/patients', postData, {observe: 'response'});
  }
}
