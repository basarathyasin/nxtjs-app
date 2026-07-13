import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import type { Project } from "@/components/platform/ProjectsTable";

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

export function useProjects() {
  const { data, loading, error, refetch } = useQuery<ProjectsResponse>(
    GET_PROJECTS,
    {
      fetchPolicy: "network-only",
    }
  );

  return {
    projects: data?.projects ?? [],
    loading,
    error,
    refetch,
  };
}