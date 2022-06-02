import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  gql,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { offsetLimitPagination } from "@apollo/client/utilities";

// Link apollo calls through /graphql
const httpLink = new HttpLink({
  uri: "/graphql",
});

// Set up some console logging so we can debug in development
const errorLink = onError(
  ({ graphQLErrors, networkError, operation: { query }, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }, i) => {
        console.log(`[GraphQL Error->Message]: #${i} = ${message}`);
      });
    }
    if (networkError) {
      console.log(`[Network Error] -> ${networkError}`);
    }
    console.log(`[Query]: -> ${query}`);
  }
);

// Create the client
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  // Caching our queries so we don't have to re-query for same things.
  cache: new InMemoryCache({
    typePolicies: {
      getAllProducts: {
        fields: {
          // merges current paginated result with the next pagined results
          feed: offsetLimitPagination(),
        },
      },
      getProductsBasedOnType: {
        fields: {
          feed: offsetLimitPagination(),
        },
      },
    },
  }),
});

export default client;
