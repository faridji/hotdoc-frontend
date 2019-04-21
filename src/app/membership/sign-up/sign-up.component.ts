import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HotDocApiService } from 'src/app/shared/services/data.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { AlertAction } from 'src/app/shared/alerts/alerts.common';
import { AuthService } from 'src/app/shared/services/auth.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  theForm: FormGroup;
  patient_id: string;

  constructor(private fb: FormBuilder, 
              private apiService: HotDocApiService,
              private authService: AuthService,
              private router: Router,
              private dialogRef: MatDialogRef<SignUpComponent>) 
  {
    this.theForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mob_number: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)] ],
      age: [null, Validators.min(0)],
      address: [null],
    });

    this.patient_id = null;
   
   }

  ngOnInit() {
    if (this.patient_id !== null)
    {
      this.loadPatientData();
    }
  }

  loadPatientData()
  {
    this.apiService.getPatient(this.patient_id).subscribe( response => {
      this.theForm.patchValue(response);
    })
  }

  get name() {
    return this.theForm.get('name');
  }

  get email() {
    return this.theForm.get('email');
  }

  get password() {
    return this.theForm.get('password');
  }

  get mob_number() {
    return this.theForm.get('mob_number');
  }

  get age() {
    return this.theForm.get('age');
  }

  private getChangedProperties(form: any): any {
    let changedProperties = {};
  
    Object.keys(form.controls).forEach((name) => {
      let currentControl = form.get(name);  
      
      if (currentControl.dirty)
        changedProperties[name] = currentControl.value;
    });
  
    return changedProperties;
  }

  onCancel(){
    this.dialogRef.close({ edit: false })
  }

  onSubmit() {
    if (this.patient_id !== null)
    {
      this.apiService.updatePatient(this.patient_id, this.theForm.value).subscribe( response => {
        console.log('Response => ', response);
        this.dialogRef.close({ edit: true });

      }, (error: HttpErrorResponse) => {
        AlertsService.error('Error', error.error);
      })
    }
    else 
    {
      const formData = this.getChangedProperties(this.theForm);
      this.apiService.addPatient(formData).subscribe( (response) => {

        const token = response.headers.get('x-auth-token')
        const decodedToken = new JwtHelperService().decodeToken(token);
        this.authService.user_name.next(decodedToken.name);
  
        if (token)
        {
          localStorage.setItem('token', token);
        }
  
        AlertsService.success('Success', 'Patient Created.').subscribe((resp: AlertAction) => {
          if(resp.positive)
          {
            this.router.navigate(['/home']);
          }
        });
      }, (error: HttpErrorResponse) => {
        AlertsService.error(error.statusText, error.error);
      })
    }
    
  }

}
