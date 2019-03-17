import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css']
})
export class AdminSignInComponent implements OnInit {

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
    console.log('Admin Sign-in form -> ', this.theForm.value);
  }
}
