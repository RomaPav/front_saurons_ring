import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PriceWebSocketService {
  private socket$: WebSocketSubject<any>| undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)){
      this.socket$ = new WebSocketSubject('wss://exchange-saurons-ring.onrender.com/price/ws/price');
      this.socket$.subscribe(
        message => {
          console.log('Message received: ', message);
        },
        err => {
          console.error('WebSocket error: ', err);
        },
        () => {
          console.log('WebSocket connection closed');
        }
      );
    }
  }

  getPriceUpdates(): Observable<any> {
    if (isPlatformBrowser(this.platformId) && this.socket$) { 
      return this.socket$.asObservable(); 
    } 
    return new Observable<any>();
    
  }

  closeConnection() {
    if (isPlatformBrowser(this.platformId)&& this.socket$) {
       this.socket$.complete();
       }
  }
}
