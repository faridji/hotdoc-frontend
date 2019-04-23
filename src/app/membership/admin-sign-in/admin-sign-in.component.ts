import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { AlertAction } from 'src/app/shared/alerts/alerts.common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css']
})
export class AdminSignInComponent implements OnInit {

  theForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { 
    this.theForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  get email() {
    return this.theForm.get('email');
  }

  get password() {
    return this.theForm.get('password');
  }

  onSubmit() {
    this.authService.login(this.theForm.value, "admin").subscribe( (response) => {

      const token = response['token'];
      const decodedToken = new JwtHelperService().decodeToken(token);
      this.authService.user_name.next(decodedToken.name);

      if (token)
      {
        localStorage.setItem('token', token);

        this.router.navigate(['admin']);
      }
        
      }, (error: HttpErrorResponse) => {
        AlertsService.error(error.statusText, error.error);
      })
  }
}
