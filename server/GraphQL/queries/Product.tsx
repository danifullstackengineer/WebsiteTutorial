import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { Product, SwordType } from "../../mongoose/models/Product";
import ProductQL, { SwordTypeENUM } from "../types/ProductQL";

/**
 *
 *
 */

const getAllProducts = {
  type: new GraphQLList(ProductQL),
  args: {
    offset: { type: GraphQLInt },
    limit: { type: GraphQLInt },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resolve(__: unknown, args: Record<string, never>) {
    // Lean is used to transform the object from a mongodb Document into a plain
    // object containing only our required fields. This greatly improves performance

    // Then we sort these by the review value decreasingly so we can display them from the best reviewed to the worst reviewed

    return await Product.find({})
      .lean()
      .sort({ "reviews.value": -1 })
      .skip(args.offset ? args.offset : 0)
      .limit(args.limit ? args.limit : 0);
  },
};

const getProductBasedOnType = {
  type: new GraphQLList(ProductQL),
  args: {
    type: { type: new GraphQLNonNull(SwordTypeENUM) },
  },
  async resolve(__: unknown, args: Record<string, SwordType>) {
    // Similar to the getAllProducs query we use lean to improve efficiency
    return await Product.find({ type_sword: args.type }).lean();
  },
};

export { getAllProducts, getProductBasedOnType };
