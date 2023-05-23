import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  //
  // getUserInfo(): Observable<UserInfoType | DefaultResponseType> {
  //   return this.http.get<UserInfoType | DefaultResponseType>(environment.api + 'users')
  // }
}
