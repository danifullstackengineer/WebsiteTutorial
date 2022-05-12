// The type definition of a product.
interface IPayment {
  id: string;
  // the type of payment used
  name:
    | "PAYPAL"
    | "STRIPE"
    | "DIRECT_CRYPTO"
    | "DIRECT_TRANSFER"
    | "META_MASK"
    | "THIRD_PARTY_CRYPTO";
}

// type definition for payments made via fiat
interface IPaymentFiat extends IPayment {
  coins: "USD" | "EUR" | "CAD" | "JPY" | "CNY" | "GBP" | "KRW" | "AUD";
}

// type definition for payments made via cryptocurrency
interface IPaymentCrypto extends IPayment {
  coins: "BTC" | "ETH" | "LTC" | "DOGE";
}

export { IPayment, IPaymentFiat, IPaymentCrypto };
