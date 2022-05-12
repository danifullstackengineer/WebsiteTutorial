// Imports required to set up our schema.
import graphql, { GraphQLObjectType, GraphQLSchema } from "graphql";

// Create the RootQuery
const RootQuery = new GraphQLObjectType({
  name: "Queries",
  fields: {},
});

// Create the RootMutation
const RootMutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {},
});

// Create the schema from the RootQuery and RootMutation objects.
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default { schema };
