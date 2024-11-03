import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bit } from '../model/bit';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://back-saurons-ring.onrender.com/users/"

  constructor(private http: HttpClient) { }

  // getAll() :Observable<any>{
  //   return this.http.get(this.apiUrl)
  // }
  // create(user: User){
  //   return this.http.post(`${this.apiUrl}`, user)
  // }
  update(user: any){
    return this.http.put(`${this.apiUrl}`,user)
  }
  // delete(id: Number){
  //   return this.http.delete(`${this.apiUrl}${id}`)
  // }
  // getById(id: Number) :Observable<any>{
  //   return this.http.get(`${this.apiUrl}${id}`)
  // }
}
