import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-sign-in',
  templateUrl: './patient-sign-in.component.html',
  styleUrls: ['./patient-sign-in.component.css']
})
export class PatientSignInComponent implements OnInit {

  theForm: FormGroup;
  constructor() { 
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
    console.log('Patient Sign-in form -> ', this.theForm.value);
  }
}
