import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getStoredJwt } from "@/src/libs/strapiAuth";

export const GRAPHQL_API_URL =
	process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL ?? "http://localhost:1337/graphql";

const httpLink = new HttpLink({ uri: GRAPHQL_API_URL });

const authLink = setContext((_, { headers }) => {
	const jwt = getStoredJwt();

	return {
		headers: {
			...headers,
			...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
