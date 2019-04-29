import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotDocApiService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { SignUpComponent } from 'src/app/membership/sign-up/sign-up.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertAction } from 'src/app/shared/alerts/alerts.common';

@Component({
  selector: 'doctor-form',
  templateUrl: './doctor-form.html',
  styleUrls: ['./doctor-form.css']
})
export class DoctorFormComponent implements OnInit {

  theForm: FormGroup;
  doctor_id: string;
  inDialog: boolean;

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

    this.doctor_id = null;
   
   }

  ngOnInit() {
    if (this.doctor_id !== null)
    {
      this.loadDoctorData();
    }
  }

  loadDoctorData()
  {
    this.apiService.getPatient(this.doctor_id).subscribe( response => {
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
    if (this.doctor_id !== null)
    {
      this.apiService.updatePatient(this.doctor_id, this.theForm.value).subscribe( response => {
        this.dialogRef.close({ editDoctor: true });

      }, (error: HttpErrorResponse) => {
        AlertsService.error('Error', error.error);
      })
    }
    else 
    {
      const formData = this.getChangedProperties(this.theForm);
      this.apiService.addPatient(formData).subscribe( (response) => {
        console.log('Doctor added...', response);

      }, (error: HttpErrorResponse) => {
        AlertsService.error(error.statusText, error.error);
      })
    } 
  }
}
