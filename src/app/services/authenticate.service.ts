import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { User } from '../model/user';
import { RoleNames, UserRole } from '../model/enums/user_role';
import { UserRequest } from '../model/user-request';
// import {jwtDecod}
interface JwtPayloadS {
  id: number
  login: string;
  full_name: string;
  email: string;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private apiUrl = "https://authenticate-saurons-ring.onrender.com"

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(this.apiUrl+"/token", body.toString(), { headers });
  }

  registry(user: UserRequest){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl+"/register", user.toJSON(), { headers });
  }

  static getUserFromJwt(token:string){
    const jwtUser = jwtDecode<JwtPayloadS>(token);
    return new User(jwtUser.id, jwtUser.login, jwtUser.full_name, jwtUser.email, RoleNames[jwtUser.role])
  }
}


