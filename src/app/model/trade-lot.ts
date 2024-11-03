export class TradeLot {
    coin_id: number;
    trade_status: string;

    constructor(coin_id: number, trade_status: string) {
        this.coin_id = coin_id;
        this.trade_status = trade_status;
    }
}