import { Component, OnInit } from "@angular/core";
import { AlertsService } from './shared/alerts/alerts.service';
import { AuthService } from './shared/services/auth.service';

import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit{
  constructor(private alertService: AlertsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token)
    {
      const decodedToken = helper.decodeToken(token);
      this.authService.user_name.next(decodedToken.name);
    }
    
  }
}
