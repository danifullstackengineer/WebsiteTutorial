// The type definition of an order.

import { IAddress, IDeliveryAddress } from "./address";
import { IPaymentCrypto, IPaymentFiat } from "./payment";
// import { IProductOrdered } from "./product";
import {IUser} from "./user";

interface IOrder {
  // id from the database corresponding to the product
  /** @readonly */
  id: string;
  // the date at which the order was created
  /** @readonly */
  made_at: Date;
  /** @readonly */
  // a string pointing to the user for which the order was created
  made_by: IUser["id"];
  // the total price of the order
  /** @readonly */
  price: number;
  // the address the user used when making the order
  address: IAddress | IDeliveryAddress;
  // the products the user has ordered
  /** @readonly */
  //TODO: Fix this
  // products: IProductOrdered[];
  /** @readonly */
  // the payment method used by the user
  payment_method: IPaymentFiat | IPaymentCrypto;
}

export default IOrder;
