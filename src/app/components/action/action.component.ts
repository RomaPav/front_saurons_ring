import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BitService } from '../../services/bit.service';
import { CoinService } from '../../services/coin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriceService } from '../../services/price.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent implements OnInit, OnDestroy {
  auctionId: string | null | undefined;
  tradeInfo: any;
  coin: any = 0;
  amount: number = 0;
  private intervalId: any;
  private intervalIdPrice: any;
  cuurentGoldPrice = 0;
  cuurentSilverPrice = 0;
  cuurentBronzePrice = 0;

  constructor(private route: ActivatedRoute, private bitService: BitService, private router: Router,private coinService: CoinService, private priceService: PriceService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('id');
    if (this.auctionId){
      this.getTradeInfo(parseInt(this.auctionId));
    }
    this.intervalIdPrice = setInterval(()=>{
      this.getPrice()
    }, 1000)
    this.intervalId = setInterval(() => {
      if (this.auctionId){
        this.getTradeInfo(parseInt(this.auctionId));
      }
    }, 5000);

  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if(this.intervalIdPrice){
      clearInterval(this.intervalIdPrice)
    }
  }

  getTradeInfo(id: Number){  
    this.bitService.getByTradeLotId(id).subscribe({
      next: (response) => {
        this.tradeInfo = response.data;
        this.amount = this.tradeInfo.amount
        this.getCoin(parseInt(this.tradeInfo.trade_lot.coin_id));
      },
      error: (error) => {
        console.error('Помилка входу', error);
      },
      complete: () => {
        console.log('Запит завершено аукціон');
      }
    });
  } 


  getCoin(id: Number){  
    this.coinService.getById(id).subscribe({
      next: (response) => {
        this.coin = response.data;
      },
      error: (error) => {
        console.error('Помилка входу', error);
      },
      complete: () => {
        console.log('Запит завершено аукціон');
      }
    });
  }
  
  checkAmount(){
    if(this.amount < 0){
      this.amount = 0;
    }
  }

  onAmountChange(event: Event) {
    const input = event.target as HTMLInputElement; 
    const value = parseFloat(input.value); 

    if (value >= 0) {
      this.amount = value;
    } else {
      this.amount = 0; 
      input.value = '0'; 
    }
  }

  getPrice(){
    this.priceService.getPrice(this.cuurentGoldPrice, this.cuurentSilverPrice, this.cuurentBronzePrice).subscribe({
      next: (response) => {
        // this.updatePrices(response);
        this.cuurentGoldPrice = response.gold;
        this.cuurentSilverPrice = response.silver;
        this.cuurentBronzePrice = response.bronze;
      },
      error: (error) => {
        console.error('Помилка входу', error);
      },
      complete: () => {
        console.log('Запит завершено аукціон');
      }
    });
  }

  updateAmount(){
    console.log(this.tradeInfo.trade_lot.trade_status);
    if (this.tradeInfo.trade_lot.trade_status != 'closed'){
      if(this.amount < this.tradeInfo.amount){
        let user = null
        if (isPlatformBrowser(this.platformId)) {
          const user_storage = localStorage.getItem("user");
          user = user_storage ? JSON.parse(user_storage) : null;
        }
        if(user !=null){
          this.tradeInfo.user_id = user.id
          this.amount = this.tradeInfo.amount;
          console.log(this.tradeInfo)
          this.bitService.update(this.tradeInfo).subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (error) => {
              console.error('Помилка входу', error);
            },
            complete: () => {
              console.log('Запит завершено аукціон');
            }
          });
        }else{
          console.log('локал сторедж не працює поки');
        }

    }else{
      alert("Лот закрито, покупка з'явиться у Вашому профілі")
    }

    }
  }
  navigateToBack() {
    clearInterval(this.intervalId);
    this.router.navigate(['/user-home']);
  }
}
