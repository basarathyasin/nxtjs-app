"use client";

import { ApolloProvider as Provider } from "@apollo/client/react";
import { useState, type ReactNode } from "react";

import { apolloClient } from "@/src/libs/apolloClient";

type ApolloProviderProps = {
	children: ReactNode;
};

export default function ApolloProvider({ children }: ApolloProviderProps) {
	const [client] = useState(() => apolloClient);

	return <Provider client={client}>{children}</Provider>;
}
