import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user_name: BehaviorSubject<null>;
  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:3000";
    this.user_name = new BehaviorSubject(null);
  }

  getUser()
  {
      const token = localStorage.getItem('token');
      if (token)
      {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        this.user_name.next(decodedToken);
      }
  }
}
