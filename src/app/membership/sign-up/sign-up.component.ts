import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HotDocApiService } from 'src/app/shared/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { AlertAction } from 'src/app/shared/alerts/alerts.common';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  theForm: FormGroup;
  constructor(private fb: FormBuilder, 
              private apiService: HotDocApiService,
              private router: Router) {
    this.theForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mob_number: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)] ],
      age: [null, Validators.min(0)],
      address: [''],
      image: ['']
    })
   
   }

  ngOnInit() {
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

  onSubmit() {
    const formData = this.getChangedProperties(this.theForm);
    this.apiService.addPatient(formData).subscribe( response => {

      AlertsService.success('Success', 'Patient Created.').subscribe((resp: AlertAction) => {
        if(resp.positive)
        {
          this.router.navigate(['/home']);
        }
      });
      }, (error: HttpErrorResponse) => {
        AlertsService.error(error.statusText, error.message);
      })
  }

}
