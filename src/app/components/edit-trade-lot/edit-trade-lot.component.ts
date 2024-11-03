import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BitService } from '../../services/bit.service';
import { CoinService } from '../../services/coin.service';
import { TradeLotService } from '../../services/trade-lot.service';

@Component({
  selector: 'app-edit-trade-lot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trade-lot.component.html',
  styleUrl: './edit-trade-lot.component.scss'
})
export class EditTradeLotComponent {
  tradeLot = { name: 'Золотий Перстень' }; 
  tradeStatuses = ['not_started', 'started', 'closed'];
  selectedTradeStatus: string = '';

  auctionId: string | null | undefined;
  tradeInfo: any;
  coin: any = 0;
  amount: number = 0;
  private intervalId: any;

  constructor(private route: ActivatedRoute, private tradeLotService: TradeLotService, private coinService: CoinService) { }

  ngOnInit(): void {
    this.auctionId = this.route.snapshot.paramMap.get('id');
    if (this.auctionId){
      this.getTradeInfo(parseInt(this.auctionId));
    }
  }

  getTradeInfo(id: Number){  
    this.tradeLotService.getById(id).subscribe({
      next: (response) => {
        this.tradeInfo = response.data;
        this.coin = this.tradeInfo.coin;
        // this.getCoin(parseInt(this.tradeInfo.coin_id));
        
      },
      error: (error) => {
        console.error('Помилка входу', error);
      },
      complete: () => {
        console.log('Запит завершено');
      }
    });
  } 

  saveTradeLot() {
    console.log(this.tradeInfo)
    this.tradeLotService.update(this.tradeInfo).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Помилка входу', error);
      },
      complete: () => {
        console.log('Запит завершено');
      }
    });
    console.log(`Лот: ${this.tradeLot.name}, Статус: ${this.selectedTradeStatus}`);
  }


  // getCoin(id: Number){  
  //   this.coinService.getById(id).subscribe({
  //     next: (response) => {
  //       this.coin = response.data;
  //       console.log(response.data)
  //     },
  //     error: (error) => {
  //       console.error('Помилка входу', error);
  //     },
  //     complete: () => {
  //       console.log('Запит завершено');
  //     }
  //   });
  // }
}
