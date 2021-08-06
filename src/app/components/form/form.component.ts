import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import {Email} from '../../models/email.model';
import { FrameworkVersion } from '../../models/frameworkVersion.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  dateOfBirth = new FormControl('', Validators.required);
  framework = new FormControl('', Validators.required);
  frameworkVersion = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  hobby = new FormControl('', Validators.required);

  myFormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    dateOfBirth: this.dateOfBirth,
    framework: this.framework,
    frameworkVersion: this.frameworkVersion,
    email: this.email,
    hobby: this.hobby
  });

  emailList: Email[] = [];
  emailRegistered = false;
  frameworkVersionList: FrameworkVersion[] = [];
  frameworkVersionOptions: String[] = [];
  user: User;
  users: User[];

  constructor (private formService: FormService) {}
  
  ngOnInit(): void {
    this.formService.getEmail().subscribe((value: any) => {
      value.map((el: any) => this.emailList.push(el));
    });

    this.formService.getFrameworkVersions().subscribe((value: any) => {
      value.map((el: any) => this.frameworkVersionList.push(el));
    });
  }

  getFrameworkVersionOptions(event: any) {
    this.frameworkVersionOptions = [];
    const {target: {value}} = event;

    this.frameworkVersionList.forEach((el: any) => {
      if (el.name === value) {
        el.versions.forEach((version: String) => {
          this.frameworkVersionOptions.push(version);
        })
      }
    });
  }

  checkIsEmailAlreadyRegisterd(event: any): void {
    const {target: {value}} = event;

    this.emailList.forEach((el: any) => {
      if (el.email === value) {
        this.emailRegistered = true;
      } else {
        this.emailRegistered = false;
      }
    });
  }

  save() {
    const {
      firstName,
      lastName,
      dateOfBirth,
      framework,
      frameworkVersion,
      email,
      hobby
    } = this.myFormGroup.value;

    const hobbyStrings = hobby.split('\n');
    let hobbyArray: Object[] = [];
    
    hobbyStrings.map((el: any) => {
      const oneOfHobbyArray = el.split('-');
      
      const oneOfHobbyObject = {
        name: oneOfHobbyArray[0],
        duration: oneOfHobbyArray[1]
      };

      hobbyArray.push(oneOfHobbyObject);
    })

    this.user = {
      firstName,
      lastName,
      dateOfBirth,
      framework,
      frameworkVersion,
      email,
      hobby: hobbyArray
    };

    this.formService.sendUser(this.user).subscribe((user: any) => this.users.push(user));

    console.log(this.user);
  }

}
