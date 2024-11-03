export class Bit {
    user_id: number;
    trade_lot_id: number;
    amount: number;

    constructor(user_id: number, trade_lot_id: number, amount: number) {
        this.user_id = user_id;
        this.trade_lot_id = trade_lot_id;
        this.amount = amount;
    }
}