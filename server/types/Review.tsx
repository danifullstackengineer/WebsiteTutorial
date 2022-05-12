import IUser from "./User";

// The type definition of a review.
interface IReview {
    id: string;
    user: IUser['id'];
    stars: 1 | 2 | 3 | 4 | 5;
    review_str: string;
    made_at: Date;
    find_useful_by: IUser['id'][];
}

export default IReview;