import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from '../model/coin';
import { Bit } from '../model/bit';

@Injectable({
  providedIn: 'root'
})
export class BitService {
  private apiUrl = "https://back-saurons-ring.onrender.com/bit/"

  constructor(private http: HttpClient) { }

  getAll() :Observable<any>{
    return this.http.get(this.apiUrl)
  }
  create(bit: Bit){
    return this.http.post(`${this.apiUrl}`, bit)
  }
  update(bit: Bit){
    return this.http.put(`${this.apiUrl}`,bit)
  }
  delete(id: Number){
    return this.http.delete(`${this.apiUrl}${id}`)
  }
  getById(id: Number) :Observable<any>{
    return this.http.get(`${this.apiUrl}${id}`)
  }
  getByTradeLotId(id: Number):Observable<any>{
    return this.http.get(`${this.apiUrl}trade-lot/${id}`)
  }
}
