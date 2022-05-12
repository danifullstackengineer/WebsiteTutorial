import mongoose from "mongoose";

import { IProduct, ProductSchemaFields } from "../models/Product";

// The type def of a user
interface IUser {
  // id from the database corresponding to a user
  /** @readonly */
  _id: mongoose.Types.ObjectId;
  // email of the user
  email: string;
  // password of the user
  /** @noclient */
  password: string;
  // the date at which the account was created
  /** @readonly */
  /** @default @new_Date */
  created_at: Date;
  // true if the user has verified his email address, false otherwise
  /** @default @false */
  verified: boolean;
  // true if the user has subscribed to the newsletter, false otherwise
  /** @requires _verified @true @true */
  /** @default @false */
  newsletter_subscribed: boolean;
  // an array of products that the user wishes to buy
  /** @default @[] */
  wishlist: IProduct[];
}

// Use of omit to get rid of one of the conflicting _id fields from the IUser and Document fields.
interface IUserDoc extends Omit<IUser, "_id">, mongoose.Document {}

const UserSchemaFields: Record<keyof IUser, any> = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    readonly: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
    readonly: true,
  },
  verified: {
    type: Boolean,
    default: false,
    required: true,
  },
  newsletter_subscribed: {
    type: Boolean,
    default: false,
    required: true,
  },
  wishlist: {
    type: [
      {
        type: ProductSchemaFields,
        readonly: true,
        ref: "Product"
      },
    ],
    default: [],
  },
};
const UserSchema = new mongoose.Schema(UserSchemaFields);

// Creating user model
const User = mongoose.model<IUserDoc>("User", UserSchema);

export {User, IUser};
