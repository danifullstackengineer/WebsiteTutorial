import { IProduct } from "./Product";

// the type definition of an ordered product.
export interface IProductOrdered extends IProduct {
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
  