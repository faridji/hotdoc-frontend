import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertAction } from 'src/app/shared/alerts/alerts.common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-sign-in',
  templateUrl: './patient-sign-in.component.html',
  styleUrls: ['./patient-sign-in.component.css']
})
export class PatientSignInComponent implements OnInit {

  theForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { 
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
    this.authService.login(this.theForm.value, "patient").subscribe( (response) => {

      const token = response['token'];
      if (token)
        localStorage.setItem('token', token);
        
      AlertsService.success('Login', 'Patient Login successfully.').subscribe((resp: AlertAction) => {
        if(resp.positive)
        {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          returnUrl = returnUrl ? returnUrl : 'home';
          this.router.navigate([returnUrl]);
        }
      });
      }, (error: HttpErrorResponse) => {
        AlertsService.error(error.statusText, error.error);
      })
  }
}
