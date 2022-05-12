import { IReview } from "./review";

// The type definition of a product.
interface IProduct {
  // id from the database corresponding to the product
  /** @readonly */
  id: string;
  // name of the product
  name: string;
  // the url pointing to the image for the product
  /** @readonly */
  image: string;
  // the price of the product
  price: number;
  // an array of strings representing each review made by a particular user.
  reviews: IReview["id"][];
  // boolean value stating if product is currently in stock or not
  is_in_stock: boolean;
  // percentage value ranging from undefined(no discount) and starting from 0+ up to 100(obviously not 100 in real life but it will be treated as such)
  discount?: number;
  // stating if the item was refurbished or not
  refurbished: boolean;
  // the type of sword
  /**
   * @readonly
   */
  type:
    | "Broadsword"
    | "Cutlass"
    | "Katana"
    | "Knife"
    | "Longsword"
    | "Rapier"
    | "Wakizashi";
}

// the type definition of an ordered product.
interface IProductOrdered extends IProduct {
  // true if the user has paid for the product
  paid: boolean;
  // true if the company has dispatched the product, false otherwise
  /** @requires _paid @true @true */
  dispatched: boolean;
  // true if the product has been delivered, false otherwise
  /** @requires _dispatched @true @true */
  delivered: boolean;
  // true if the user has started a refund request, false otherwise
  /** @requires _delivered @true @true */
  started_refund: boolean;
  // true if the company has received the item for which the refund request has been issued, false otherwise
  /** @requires started_refund @true @true */
  refunded: boolean;
  // date at which a refund is no longer valid
  /** @requires paid @true @true */
  remaining_day_until_no_refund: Date;
}

export { IProduct, IProductOrdered };
