// The type definition of a product.
interface IPayment {
  // the type of payment used
  /** @readonly */
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
  // the fiat coin type used for the payment
  /** @readonly */
  coins: "USD" | "EUR" | "CAD" | "JPY" | "CNY" | "GBP" | "KRW" | "AUD";
}

// type definition for payments made via cryptocurrency
interface IPaymentCrypto extends IPayment {
  // the crypto coin type used for the payment
  /** @readonly */
  coins: "BTC" | "ETH" | "LTC" | "DOGE";
}

export { IPayment, IPaymentFiat, IPaymentCrypto };
