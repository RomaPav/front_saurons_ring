import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private apiUrl = "https://exchange-saurons-ring.onrender.com/price/"

  constructor(private http: HttpClient) { }

  getPrice(goldPrice:number, silverPrice: number, bronzePrice: number) :Observable<any>{
    return this.http.get(`${this.apiUrl}${goldPrice}/${silverPrice}/${bronzePrice}`)
  }
}
