import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TradeLotService } from '../../services/trade-lot.service';
import { Router } from '@angular/router';
import { PriceService } from '../../services/price.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent implements OnInit, OnDestroy, AfterViewInit{
  public isBrowser: boolean;
  private tradeLotService: TradeLotService
  cuurentGoldPrice = 0;
  cuurentSilverPrice = 0;
  cuurentBronzePrice = 0;
  private intervalId: any;
  user: any = null;
  chart: any;

  constructor(private elementRef: ElementRef,
     @Inject(PLATFORM_ID) platformId: Object, 
     traadeLotService: TradeLotService,
     private router: Router,
    private priceService: PriceService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.tradeLotService = traadeLotService;
    if (isPlatformBrowser(platformId)) {
      const user_storage = localStorage.getItem("user");
      this.user = user_storage ? JSON.parse(user_storage) : null;
    }
  }


  visibleRings: any = [];

  ngOnInit() {
    this.getCoins()
  }
  ngAfterViewInit() {
    // this.intervalId = setInterval(() => {
    //   this.getPrice();
    // }, 1000);
    this.getPrice();
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }



  getCoins(){  
    this.tradeLotService.getStartedForBuying().subscribe({
      next: (response) => {
        this.visibleRings = response.data;
      },
      error: (error) => {
        console.error('Помилка входу', error);
      },
      complete: () => {
        console.log('Запит завершено');
      }
    });
  } 

  navigateToAuction(auctionId: number) {
    this.router.navigate(['/auction', auctionId]);
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
        console.log('Запит завершено юзер');
      }
    });
  }
  

}
