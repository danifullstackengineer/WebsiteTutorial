import mongoose, { Document, ObjectId, Model } from "mongoose";
import { IUser } from "./User";

// The type definition of a review.
interface IReview {
  // id from the database corresponding to the product
  /** @readonly */
  _id: ObjectId;
  // string corresponding to the id of the user who has made the review
  /** @readonly */
  user: IUser["_id"];
  // the amount of stars in the review given by the user
  stars: 0 | 1 | 2 | 3 | 4 | 5;
  // the review made by the user
  review_str?: string[];
  // the date at which the review was made
  /** @readonly */
  made_at: Date;
  // an array of id's by users who found the review useful
  found_useful_by: ObjectId[];
}

export interface IReviewDoc extends Omit<IReview, "_id">, mongoose.Document {}

enum ReviewStars {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export const ReviewSchemaFields: Record<keyof IReview, any> = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    readonly: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    readonly: true,
    required: true,
  },
  stars: {
    type: ReviewStars,
    required: true,
  },
  review_str: [String],
  made_at: {
    type: Date,
    required: true,
    default: new Date(),
    readonly: true,
  },
  found_useful_by: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    required: true,
  },
};

const ReviewSchema = new mongoose.Schema(ReviewSchemaFields);

const Review = mongoose.model<IReviewDoc>("Review", ReviewSchema);

export { Review, IReview };
