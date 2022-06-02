import mongoose from "mongoose";

// The type definition of a product.
interface IProduct {
  // id from the database corresponding to the product
  // The ObjectId in the interface is different from the one on the schema side
  /** @readonly */
  _id: Readonly<mongoose.Types.ObjectId>;
  // name of the product
  name: string;
  // the url pointing to the image for the product
  image: Readonly<string>;
  // the price of the product
  price: number;
  // an array of strings representing each review made by a particular user.
  /** @default @ {ids, value} */
  /** @default @[] @arg*/
  /** @default @0 @arg*/
  reviews: { ids: mongoose.Types.ObjectId[]; value: number };
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
  type_sword: Readonly<SwordType>;
  // the description of the sword
  description: string[];
  // the type of the metal used in the sword
  metal_type: Readonly<MetalType>;
  // the overall length of the sword
  total_length: Readonly<number>;
  // the length of the blade
  blade_length: Readonly<number>;
  // the width of the blade
  blade_width: Readonly<number>;
  // the weight of the sword
  sword_weight: Readonly<number>;
  // the point of balance of the sword
  point_of_balance: Readonly<number>;
  // the edge of the sword
  sword_edge: Readonly<SwordEdge>;
  // if engraving is available
  engraving: boolean;
}

export enum MetalType {
  HIGH_CARBON_STEEL_1045,
  HIGH_CARBON_STEEL_1060,
  HIGH_CARBON_STEEL_1075,
  HIGH_CARBON_STEEL_1095,
  SPRING_STEEL,
}
export enum SwordEdge {
  SHARPENED,
  UNSHARPENED,
}
export enum SwordType {
  BROADSWORD,
  CUTLASS,
  KATANA,
  KNIFE,
  LONGSWORD,
  RAPIER,
  WAKIZASHI,
}

// Omit the _id field in the IProduct interface so it doesn't clash with Document type
export interface IProductDoc extends Omit<IProduct, "_id">, mongoose.Document {}

export const ProductSchemaFields: Record<keyof IProduct, any> = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    readonly: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    readonly: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Make reviews an array of references to the users that left a review.
  reviews: {
    type: {
      ids: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
          readonly: true,
          required: true,
        },
      ],
      value: {
        type: Number,
        required: true,
      },
      default: { ids: 0, value: 0 },
    },
  },
  is_in_stock: {
    type: Boolean,
    default: true,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    required: true,
  },
  refurbished: {
    type: Boolean,
    default: false,
    required: true,
  },
  type_sword: {
    type: Number,
    enum: SwordType,
    required: true,
	readonly: true
  },
  description: {
    type: [String],
    required: true,
	readonly: true
  },
  metal_type: {
    type: Number,
    enum: MetalType,
    required: true,
	readonly: true
  },
  total_length: {
    type: Number,
    required: true,
	readonly: true
  },
  blade_length: {
    type: Number,
    required: true,
	readonly: true
  },
  blade_width: {
    type: Number,
    required: true,
	readonly: true
  },
  sword_weight: {
    type: Number,
    required: true,
	readonly: true
  },
  point_of_balance: {
    type: Number,
    required: true,
	readonly: true
  },
  sword_edge: {
    type: Number,
    enum: SwordEdge,
    required: true,
	readonly: true
  },
  engraving: {
    type: Boolean,
    required: true,
  },
};
const ProductSchema = new mongoose.Schema(ProductSchemaFields);

// Creating product model
const Product = mongoose.model<IProductDoc>("Product", ProductSchema);

export { Product, IProduct };
