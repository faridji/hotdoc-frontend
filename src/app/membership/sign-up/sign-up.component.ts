import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  theForm: FormGroup;
  constructor() {
    this.theForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      mob_number: new FormControl('', [
                  Validators.required,
                  Validators.minLength(11),
                  Validators.maxLength(11)
                ]),
      age: new FormControl('', Validators.min(0)),
      address: new FormControl(''),
      image: new FormControl(),
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
