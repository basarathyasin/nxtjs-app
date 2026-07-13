import { gql } from "@apollo/client";

import type { Project } from "@/components/platform/ProjectsTable";
import { apolloClient } from "@/src/libs/apolloClient";

const GET_PROJECTS = gql`
	query GetProjects {
		projects {
			documentId
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

type StrapiProject = Omit<Project, "id"> & {
	documentId: string;
};

type ProjectsResponse = {
	projects: StrapiProject[];
};

export async function fetchProjects(): Promise<Project[]> {
	const { data } = await apolloClient.query<ProjectsResponse>({
		query: GET_PROJECTS,
		fetchPolicy: "network-only",
	});

	return (
		data?.projects.map((project) => ({
			id: project.documentId,
			...project,
		})) ?? []
	);
}
