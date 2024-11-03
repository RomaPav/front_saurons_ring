export class Order {
    // id: number;
    coin_id: number;
    user_id: number;

    // constructor(id : number, coin_id: number, user_id: number) {
    //     this.id =id
    //     this.coin_id = coin_id;
    //     this.user_id = user_id;
    // }
    constructor( coin_id: number, user_id: number) {
        this.coin_id = coin_id;
        this.user_id = user_id;
    }
}