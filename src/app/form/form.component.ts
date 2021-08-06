import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import emailList from '../files/emailList.json';
import frameworkVersionList from '../files/frameworkVersionList.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  dateOfBirth = new FormControl('', Validators.required);
  framework = new FormControl('', Validators.required);
  frameworkVersion = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email, this.checkIsEmailAlreadyRegisterd]);
  hobby = new FormControl([], Validators.required);

  myFormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    dateOfBirth: this.dateOfBirth,
    framework: this.framework,
    frameworkVersion: this.frameworkVersion,
    email: this.email,
    hobby: this.hobby
  });

  frameworkVersionOptions: String[] = [];

  getFrameworkVersionOptions(event: any) {
    this.frameworkVersionOptions = [];
    const {target: {value}} = event;

    frameworkVersionList.forEach((el: any) => {
      if (el.name === value) {
        el.versions.forEach((version: String) => {
          this.frameworkVersionOptions.push(version);
        })
      }
    });
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
