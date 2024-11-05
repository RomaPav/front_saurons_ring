import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { CoinService } from '../../services/coin.service';
import { TradeLotService } from '../../services/trade-lot.service';
import { Router } from '@angular/router';
import { PriceService } from '../../services/price.service';
import { interval, Subject, switchMap, takeUntil } from 'rxjs';
import { PriceWebSocketService } from '../../services/price-web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.scss'
})
export class OwnerHomeComponent implements OnInit, OnDestroy, AfterViewInit{
  public isBrowser: boolean;
  private coinService: CoinService
  private tradeLotService: TradeLotService
  visibleRings: any = [];
  cuurentGoldPrice = 0;
  cuurentSilverPrice = 0;
  cuurentBronzePrice = 0;
  private intervalId: any;
  private destroy$ = new Subject<void>();
  private subscription!: Subscription;

  constructor(private elementRef: ElementRef, 
    @Inject(PLATFORM_ID) platformId: Object, 
    private renderer2: Renderer2, 
    coinService: CoinService, 
    traadeLotService: TradeLotService, 
    private router: Router,
  private priceService: PriceService,
  private priceWebSocketService: PriceWebSocketService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.coinService = coinService
    this.tradeLotService = traadeLotService
  }

  

  ngOnInit() {
    // this.getCoins()
    this.subscription = this.priceWebSocketService.getPriceUpdates().subscribe({
      next: (data) => {
        this.cuurentGoldPrice = data.gold;
        this.cuurentSilverPrice = data.silver;
        this.cuurentBronzePrice = data.bronze;
      },
      error: (err) => console.error('WebSocket error:', err),
    });
  }
  ngAfterViewInit() {
    // this.intervalId = setInterval(() => {
    //   this.getPrice();
    // }, 1000);
    // this.destroy$.next();
    // this.destroy$.complete();
    this.getPrice();
  }
  ngOnDestroy(): void {
    // if (this.intervalId) {
    //   clearInterval(this.intervalId);
    // }
    this.subscription.unsubscribe();
    this.priceWebSocketService.closeConnection();
  }
  navigateToEditTrade(tradeId: number) {
    this.router.navigate(['/edit-lot', tradeId]);
  }
  navigateToCreateLot() {
    this.router.navigate(['/create-lot']);
  }

  getCoins(){  
    this.tradeLotService.getStarted().subscribe({
      next: (response) => {
        this.visibleRings = response.data;
      },
      error: (error) => {
        console.error('Помилка входу', error);
      },
      complete: () => {
        console.log('Запит завершено власник');
      }
    });
  } 

  getPrice(){
    this.priceService.getPrice(this.cuurentGoldPrice, this.cuurentSilverPrice, this.cuurentBronzePrice).subscribe({
      next: (response) => {
        this.cuurentGoldPrice = response.gold;
        this.cuurentSilverPrice = response.silver;
        this.cuurentBronzePrice = response.bronze;
      },
      error: (error) => {
        console.error('Помилка входу', error);
      },
      complete: () => {
        console.log('Запит завершено власник');
      }
    });
  }

}
