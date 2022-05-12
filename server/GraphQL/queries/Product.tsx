import { GraphQLList } from "graphql";
import { Product } from "../../mongoose/models/Product";
import ProductQL from "../types/ProductQL";

/**
 *
 *
 */

const getAllProducts = {
  type: new GraphQLList(ProductQL),
  args: {},
  async resolve(__: undefined, _: {}) {
    return await Product.find({});
  },
};

export { getAllProducts };
