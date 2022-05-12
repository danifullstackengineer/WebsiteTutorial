import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
} from "graphql";

const ProductQL = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    // price needs to be float since int in graphql !== number but int === integer number;
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    reviews: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
    is_in_stock: {type: new GraphQLNonNull(GraphQLBoolean)},
    // keep it as int since we will be working with integer discounts.
    discount: {type: new GraphQLNonNull(GraphQLInt)},
    refurbished: {type: new GraphQLNonNull(GraphQLBoolean)},
    type_sword: {type: new GraphQLNonNull(GraphQLString)}
  }),
});


export default ProductQL;