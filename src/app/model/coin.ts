export class Coin {
    name: string;
    price: number;
    gold: number;
    silver: number;
    bronze: number;

    constructor(name: string, price: number, gold: number, silver: number, bronze: number) {
        this.name = name;
        this.price = price;
        this.gold = gold;
        this.silver = silver;
        this.bronze = bronze;
    }
}