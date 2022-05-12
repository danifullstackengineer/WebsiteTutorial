import {IUser} from "./user";

// The type definition of a review.
interface IReview {
  // id from the database corresponding to the product
  /** @readonly */
  id: string;
  // string corresponding to the id of the user who has made the review
  /** @readonly */
  user: IUser["id"];
  // the amount of stars in the review given by the user
  stars: 1 | 2 | 3 | 4 | 5;
  // the review made by the user
  review_str?: string;
  // the date at which the review was made
  /** @readonly */
  made_at: Date;
  // array of strings corresponding to different users that have marked the review as being useful to them
  find_useful_by: IUser["id"][];
}

export {IReview};