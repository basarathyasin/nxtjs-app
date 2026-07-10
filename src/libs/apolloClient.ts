import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const GRAPHQL_API_URL = "http://localhost:4000/graphql";

export const apolloClient = new ApolloClient({
	link: new HttpLink({ uri: GRAPHQL_API_URL }),
	cache: new InMemoryCache(),
});
