// Front-end product interface
// Every field is readonly as all of our products are queried from the db, so we shouldn't/can't change them from the front-end.
interface IProduct {
  // ObjectId is not supported on the front end so we use string instead.
  // Apollo/GraphQL takes care of validating if the String is indeed
  // an ObjectId
  /** @readonly */
  _id: Readonly<string>;
  // The name of the product
  name: Readonly<string>;
  // the image of the product
  image: Readonly<string>;
  // the price of the product
  price: Readonly<number>;
  // an array of strings representing each review made by a particular user.
  /** @default @ {ids, value} */
  /** @default @[] @arg*/
  /** @default @0 @arg*/
  reviews: Readonly<{ ids: string[]; value: number }>;
  // if the product is in stock currently.
  /** @default @true */
  is_in_stock: Readonly<boolean>;
  // the amount of discount the product has
  /** @default @0 */
  discount: Readonly<number>;
  // if the product is refurbished or not
  /** @default @false */
  refurbished: Readonly<false>;
  // the type of the sword
  type_sword: Readonly<SwordType>;
  // description of the sword
  description: Readonly<string[]>;
  // the type of metal
  metal_type: Readonly<MetalType>;
  // the overall length
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
  // if engraving is available for this sword
  engraving: Readonly<boolean>;
}

// These are the same as the ones on the front-end so just copy them
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
  BROADSWORD = 0,
  CUTLASS = 1,
  KATANA = 2,
  KNIFE = 3,
  LONGSWORD = 4,
  RAPIER = 5,
  WAKIZASHI = 6,
}


export default IProduct;
