// Imports required to set up our schema.
import {GraphQLObjectType, GraphQLSchema, graphql} from 'graphql';
import { createUser } from './mutations/User';
import { getAllProducts } from './queries/Product';

// Create the RootQuery
const RootQuery = new GraphQLObjectType({
  name: "Queries",
  fields: {
    getAllProducts: getAllProducts
  },
});

// Create the RootMutation
const RootMutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    createUser: createUser
  },
});

// Create the schema from the RootQuery and RootMutation objects.
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
export default schema;
