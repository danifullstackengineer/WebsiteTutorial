import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import ProductQL from "./ProductQL";

const UserQL = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    // Have to use GraphQLString because GraphQL does not have by itself a Date type
    created_at: { type: new GraphQLNonNull(GraphQLString) },
    verified: { type: new GraphQLNonNull(GraphQLBoolean) },
    newsletter_subscribed: { type: new GraphQLNonNull(GraphQLBoolean) },
    wishlist: { type: new GraphQLNonNull(new GraphQLList(ProductQL)) },
  }),
});

export default UserQL;
