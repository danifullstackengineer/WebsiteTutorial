import mongoose from "mongoose";

// The type definition of a product.
interface IProduct {
  // id from the database corresponding to the product
  // The ObjectId in the interface is different from the one on the schema side
  /** @readonly */
  _id: mongoose.Types.ObjectId;
  // name of the product
  name: string;
  // the url pointing to the image for the product
  /** @readonly */
  image: string;
  // the price of the product
  price: number;
  // an array of strings representing each review made by a particular user.
  /** @default @[] */
  reviews: mongoose.Types.ObjectId[];
  // boolean value stating if product is currently in stock or not
  /** @default @true */
  is_in_stock: boolean;
  // percentage value ranging from 0(no discount) up to 100(obviously not 100 in real life but it will be treated as such)
  /** @default @0 */
  discount: number;
  // stating if the item was refurbished or not
  /** @default @false */
  refurbished: boolean;
  // the type of sword
  /**
   * @readonly
   */
  type_sword:
    | "Broadsword"
    | "Cutlass"
    | "Katana"
    | "Knife"
    | "Longsword"
    | "Rapier"
    | "Wakizashi";
}

// Omit the _id field in the IProduct interface so it doesn't clash with Document type
interface IProductDoc extends Omit<IProduct, "_id">, mongoose.Document {}

export const ProductSchemaFields: Record<keyof IProduct, any> = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    readonly: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    readonly: true,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  // Make reviews an array of references to the users that left a review.
  reviews: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        readonly: true
      },
    ],
    default: [],
  },
  is_in_stock: {
    type: Boolean,
    default: true,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    required: true
  },
  refurbished: {
    type: Boolean,
    default: false,
    required: true
  },
  type_sword: {
    type: String,
    required: true,
    readonly: true,
  },
};
const ProductSchema = new mongoose.Schema(ProductSchemaFields);

// Creating product model
const Product = mongoose.model<IProductDoc>("Product", ProductSchema);

export { Product, IProduct };
