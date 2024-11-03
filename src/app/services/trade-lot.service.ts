import { Injectable } from '@angular/core';
import { TradeLot } from '../model/trade-lot';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeLotService {
  private apiUrl = "https://back-saurons-ring.onrender.com/trade-lot/"

  constructor(private http: HttpClient) { }

  getAll() :Observable<any>{
    return this.http.get(this.apiUrl)
  }
  create(tradeLot: TradeLot){
    return this.http.post(`${this.apiUrl}`, tradeLot)
  }
  update(tradeLot: TradeLot){
    return this.http.put(`${this.apiUrl}`,tradeLot)
  }
  delete(id: Number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  getById(id: Number) :Observable<any>{
    return this.http.get(`${this.apiUrl}id/${id}`)
  }
  getByUserId(id: Number) :Observable<any>{
    return this.http.get(`${this.apiUrl}coin-id/${id}`)
  }
  getStarted() :Observable<any>{
    return this.http.get(`${this.apiUrl}started/`)
  }
  getStartedForBuying() :Observable<any>{
    return this.http.get(`${this.apiUrl}started-for-buying/`)
  }

}
