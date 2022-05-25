export interface OrderPayLoad {
    type: string;
    price_type: "market" | "limit";
    amount: number;
    limit?: number;
}

export interface MarketResponse {
    data: {
        market: marketResponseData;
    }
}

export interface marketResponseData {
    id: string;
    name: string;
    base_currency: string;
    quote_currency: string;
    minimum_order_amount:string[] // [amount, currency]
    taker_fee: string;
    maker_fee: string;
}
