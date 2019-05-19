import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  private url: string;
  constructor(private http: HttpClient) { 
    this.url = 'https://hotdocv1-0.herokuapp.com/api/dashboard';
  }


  getAllCounts()
  {
    return this.http.get(this.url + '/GetAllCounts');
  }
}
