import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Email} from '../models/email.model';
import { FrameworkVersion } from '../models/frameworkVersion.model';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private emailListUrl = '../../assets/files/emailList.json';
  private frameworkVersionListUrl= '../../assets/files/frameworkVersionList.json';
  private server = 'fakeServer';

  constructor(private httpClient: HttpClient) { }

  getEmail(): Observable<Email[]> {
    return this.httpClient.get<Email[]>(this.emailListUrl);
  }

  getFrameworkVersions(): Observable<FrameworkVersion[]> {
    return this.httpClient.get<FrameworkVersion[]>(this.frameworkVersionListUrl);
  }

  sendUser(user: User) {
    return this.httpClient.post<void>(this.server, user);
  }
}
