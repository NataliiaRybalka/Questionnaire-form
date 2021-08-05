import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  firstName = new FormControl('');
  lastName = new FormControl('');
  dateOfBirth = new FormControl('');
  framework = new FormControl('');
  frameworkVersion = new FormControl('');
  email = new FormControl('');
  hobby = new FormControl('');
  // firstName = new FormControl('', Validators.required);
  // lastName = new FormControl('', Validators.required);
  // dateOfBirth = new FormControl('', Validators.required);
  // framework = new FormControl('', Validators.required);
  // frameworkVersion = new FormControl('', Validators.required);
  // email = new FormControl('', [Validators.required, Validators.email]);
  // hobby = new FormControl([], Validators.required);

  myFormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    dateOfBirth: this.dateOfBirth,
    framework: this.framework,
    frameworkVersion: this.frameworkVersion,
    email: this.email,
    hobby: this.hobby
  });

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.myFormGroup);
  }

}
