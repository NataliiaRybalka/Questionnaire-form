import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import emailList from '../files/emailList.json';
import frameworkVersionList from '../files/frameworkVersion.json';

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
  email = new FormControl('', [Validators.required, Validators.email, this.checkIsEmailAlreadyRegisterd]);
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

  checkIsEmailAlreadyRegisterd(control: AbstractControl) {
    let emailRegistered = false;

    emailList.forEach((el: any) => {
      if (el.email === control.value) {
        emailRegistered = true;
      }
    });

    if (emailRegistered) {
      return {emailRegistered: true}
    }

    return null;
  }

  save() {
    console.log(this.myFormGroup);
  }

}
