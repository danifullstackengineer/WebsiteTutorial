// The type definition of an order.

import { IAddress, IDeliveryAddress } from "./Address";
import { IPaymentCrypto, IPaymentFiat } from "./Payment";
import { IProductOrdered } from "./Product";
import IUser from "./User";

interface IOrder {
  id: string;
  // the date at which the order was created
  made_at: Date;
  // a string pointing to the user for which the order was created
  made_by: IUser["id"];
  // the total price of the order
  price: number;
  // the address the user used when making the order
  address: IAddress | IDeliveryAddress;
  // the products the user has ordered
  products: IProductOrdered[];
  // the payment method used by the user
  payment_method: IPaymentFiat | IPaymentCrypto;
}

export default IOrder;
