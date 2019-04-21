import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotDocApiService {

  baseUrl: string;

  constructor(private http: HttpClient) 
  { 
    this.baseUrl = "http://localhost:3000";
  }

  getAllPatients()
  {
    return this.http.get(this.baseUrl + '/api/patients');
  }

  getPatient(id: string)
  {
    return this.http.get(this.baseUrl + '/api/patients/' + id);
  }

  addPatient(postData: any) 
  {
    return this.http.post(this.baseUrl + '/api/patients', postData, {observe: 'response'});
  }

  updatePatient(id: any, formData)
  {
    return this.http.put(this.baseUrl + '/api/patients/' + id, formData);
  }

  deletePatient(id: string)
  {
    return this.http.delete(this.baseUrl + '/api/patients/' + id);
  }
}
