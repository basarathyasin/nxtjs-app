import Articles, { type Article } from "@/components/sections/Articles";
import { apolloClient } from "@/src/libs/apolloClient";
import { gql } from "@apollo/client";

export const dynamic = "force-static";

const GET_ARTICLES = gql`
	query Articles {
		articles {
			documentId
			title
			description
			slug
			category {
				name
			}
			author {
				name
			}
			content
			publishedAt
		}
	}
`;

type ArticlesResponse = {
	articles: Article[];
};

export default async function Blogs() {
	const { data } = await apolloClient.query<ArticlesResponse>({
		query: GET_ARTICLES,
		fetchPolicy: "network-only",
	});

	const articles = data?.articles ?? [];

	return <Articles articles={articles} />;
}
