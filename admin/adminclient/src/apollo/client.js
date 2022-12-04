//refernece by sk this is apollo client 
import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_ENDPOINT = "http://localhost:4009/graphql";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache,
});

export default client;
