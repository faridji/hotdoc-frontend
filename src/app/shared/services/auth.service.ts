import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<{}>;
  private baseUrl: string;

  constructor(private http: HttpClient, private router: Router) { 
    this.baseUrl = "https://hotdocv1-0.herokuapp.com";
    this.user = new BehaviorSubject({});
  }

  getCurrentUser()
  {
    const token = localStorage.getItem('token');
    if (token)
    {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken;
    }
    return null;
  }

  login(credentials: any, userType: string)
  {
    if (userType === 'admin')
      return this.http.post(this.baseUrl + '/api/auth/admin', credentials);
    if (userType === 'patient')
      return this.http.post(this.baseUrl + '/api/auth/patient', credentials);
  }

  logout()
  {
    localStorage.removeItem('token');
    this.user.next({});
    this.router.navigate(['/home']);
  }
}