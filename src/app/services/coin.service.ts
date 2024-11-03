import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { RoleNames } from '../model/enums/user_role';
import { User } from '../model/user';
import { UserRequest } from '../model/user-request';
import { Coin } from '../model/coin';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private apiUrl = "https://back-saurons-ring.onrender.com/coin/"

  constructor(private http: HttpClient) { }

  getAll() :Observable<any>{
    return this.http.get(this.apiUrl)
  }
  create(coin: Coin) :Observable<any>{
    return this.http.post(`${this.apiUrl}`, coin)
  }
  update(coin: Coin){
    return this.http.put(`${this.apiUrl}`,coin)
  }
  delete(id: Number){
    return this.http.delete(`${this.apiUrl}${id}`)
  }
  getById(id: Number):Observable<any>{
    return this.http.get(`${this.apiUrl}${id}`)
  }

  getPrice() :Observable<any>{
    return this.http.get("https://api.metals.dev/v1/latest?api_key=FMPFG58ST4AJ5JRGORLW868RGORLW&currency=USD&unit=kg")
  }


}
