import { gql } from "@apollo/client";

import type { Project } from "@/components/platform/ProjectsTable";
import { apolloClient } from "@/src/libs/apolloClient";

const GET_PROJECTS = gql`
	query GetProjects {
		projects {
			id
			firstName
			lastName
			email
			company
			teamSize
			goal
			budget
			timeline
			createdAt
		}
	}
`;

type ProjectsResponse = {
	projects: Project[];
};

export async function fetchProjects() {
	const response = await apolloClient.query<ProjectsResponse>({
		query: GET_PROJECTS,
		fetchPolicy: "network-only",
	});

	return response.data?.projects ?? [];
}
