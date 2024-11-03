import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoinService } from '../../services/coin.service';
import { TradeLotService } from '../../services/trade-lot.service';

@Component({
  selector: 'app-create-trade-lot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-trade-lot.component.html',
  styleUrl: './create-trade-lot.component.scss'
})
export class CreateTradeLotComponent {
  coin = {
    "name": '',
    "price": 0,
    "gold": 0,
    "silver": 0,
    "bronze": 0
  }
  tradeLot = {
    "coin_id": 0,
    "trade_status": "not_started"
  }

  constructor(private coinService: CoinService, private tradeLotService: TradeLotService){

  }

  createTradeLot() {
    if(this.coin.gold + this.coin.silver + this.coin.bronze){
      console.log(this.coin);
      this.coinService.create(this.coin).subscribe({
        next: (response) => {
          console.log(response);
          this.tradeLot.coin_id = response.data.id
          this.creaateTrdeLot()
        },
        error: (error) => {
          console.error('Помилка входу', error);
        },
        complete: () => {
          console.log('Запит завершено');
        }
      });
    }else{
      alert("сума процентів не може перевищувати 100")
    }
  }

  creaateTrdeLot(){
    if(this.tradeLot.coin_id!=0){
      this.tradeLotService.create(this.tradeLot).subscribe({
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
    }

  }
}
