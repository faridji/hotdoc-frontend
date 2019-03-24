import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  theForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.theForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mob_number: ['', [Validators.required, Validators.min(11), Validators.max(13)] ],
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

  onSubmit() {
    console.log('Form:', this.theForm.value);
  }

}
