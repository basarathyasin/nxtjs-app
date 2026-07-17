import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers.js";

export const schema = createSchema({
	typeDefs: /* GraphQL */ `
		type Project {
			id: ID!
			firstName: String!
			lastName: String!
			email: String!
			company: String!
			teamSize: String!
			goal: String!
			budget: String!
			timeline: String!
			createdAt: String!
		}

		type Query {
			projects: [Project!]!
		}
	`,
	resolvers,
});
