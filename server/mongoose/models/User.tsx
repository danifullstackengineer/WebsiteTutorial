import {Model, Document, ObjectId} from 'mongoose';

import { IProduct } from "../models/Product";

// The type def of a user
interface IUser {
  // id from the database corresponding to a user
  /** @readonly */
  _id: ObjectId;
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
interface IUserDoc extends Omit<IUser, "_id">, Document {};
// Now create the model
export default interface IUserModel extends Model<IUserDoc> {};