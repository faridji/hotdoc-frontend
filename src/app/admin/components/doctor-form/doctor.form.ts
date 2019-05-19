import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SignUpComponent } from 'src/app/membership/sign-up/sign-up.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { DeptService } from 'src/app/shared/services/dept.service';


@Component({
  selector: 'doctor-form',
  templateUrl: './doctor-form.html',
  styleUrls: ['./doctor-form.css']
})
export class DoctorFormComponent implements OnInit {

  theForm: FormGroup;
  doctor_id: string;

  depts: any;
  degrees: any[];
  experiences: any[];

  constructor(private fb: FormBuilder, 
              private apiService: DoctorService,
              private deptService: DeptService,
              private dialogRef: MatDialogRef<SignUpComponent>) 
  {
    this.theForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mob_number: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)] ],
      department: ['', [Validators.required]],
      education: [ [], Validators.required],
      experience: ['', [Validators.required]],
      age: [null, Validators.min(0)],
      address: [null],
    });

    this.doctor_id = null;

    this.depts = [];
    this.degrees = [];
    this.experiences = [];
  }

  ngOnInit() {

    this.degrees = ['MBBS', 'FCPS'];

    this.deptService.getAll().subscribe( resp => {
      this.depts = resp;
    });
    
    this.experiences = [
      {key: '1 Year', value: 1},
      {key: '2 Year', value: 2},
      {key: '3 Year', value: 3},
      {key: '4 Year', value: 4},
      {key: '5 Year', value: 5},
      {key: 'More than 5 years', value: 555},
    ];

    if (this.doctor_id !== null)
    {
      this.loadDoctorData();
    }
  }

  loadDoctorData()
  {
    this.apiService.get(this.doctor_id).subscribe( response => {
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
  
  get education() {
    return this.theForm.get('education');
  }

  get dept() {
    return this.theForm.get('department');
  }

  get experience() {
    return this.theForm.get('experience');
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
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.doctor_id !== null)
    {
      this.apiService.update(this.doctor_id, this.theForm.value).subscribe( response => {
        this.dialogRef.close({ editDoctor: true });

      }, (error: HttpErrorResponse) => {
        AlertsService.error('Error', error.error);
      })
    }
    else 
    {
      const formData = this.getChangedProperties(this.theForm);
      this.apiService.add(formData).subscribe( (response) => {
        this.dialogRef.close({ addDoctor: true });

      }, (error: HttpErrorResponse) => {
        AlertsService.error(error.statusText, error.error);
      });
    } 
  }
}