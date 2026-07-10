const projects = [
	{
		id: "project-demo-1",
		firstName: "Aisha",
		lastName: "Khan",
		email: "aisha@example.com",
		company: "Northstar Studio",
		teamSize: "11-50",
		goal: "Build a clean dashboard for tracking customer onboarding work.",
		budget: "15k-50k",
		timeline: "next-quarter",
		createdAt: "Jul 10, 2026",
	},
	{
		id: "project-demo-2",
		firstName: "Rohan",
		lastName: "Mehta",
		email: "rohan@example.com",
		company: "Pixel Works",
		teamSize: "1-10",
		goal: "Create a simple workflow for collecting and reviewing project leads.",
		budget: "5k-15k",
		timeline: "this-month",
		createdAt: "Jul 09, 2026",
	},
];

export const resolvers = {
	Query: {
		projects: () => projects,
	},
};
