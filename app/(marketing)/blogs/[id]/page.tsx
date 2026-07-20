import Link from "next/link";
import { notFound } from "next/navigation";
import { gql } from "@apollo/client";

import { apolloClient } from "@/src/libs/apolloClient";
import type { Article } from "@/components/sections/Articles";

export const dynamic = "force-static";
export const dynamicParams = false;

const GET_ARTICLES = gql`
	query Articles {
		articles {
			documentId
		}
	}
`;

const GET_ARTICLE = gql`
	query Article($documentId: ID!) {
		article(documentId: $documentId) {
			title
			slug
			documentId
			description
			content
			category {
				name
			}
			author {
				name
			}
		}
	}
`;

type ArticlesResponse = {
	articles: Pick<Article, "documentId">[];
};

type ArticleResponse = {
	article: Article | null;
};

type BlogDetailPageProps = {
	params: Promise<{
		id: string;
	}>;
};

type RichTextChild = {
	text?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
};

type RichTextBlock = {
	type?: string;
	level?: number;
	children?: RichTextChild[];
};

async function fetchArticles() {
	const { data } = await apolloClient.query<ArticlesResponse>({
		query: GET_ARTICLES,
		fetchPolicy: "network-only",
	});

	return data?.articles ?? [];
}

async function fetchArticle(documentId: string) {
	const { data } = await apolloClient.query<ArticleResponse>({
		query: GET_ARTICLE,
		variables: {
			documentId,
		},
		fetchPolicy: "network-only",
	});

	return data?.article ?? null;
}

function isRichTextBlocks(value: unknown): value is RichTextBlock[] {
	return Array.isArray(value);
}

function renderTextChildren(children: RichTextChild[] | undefined) {
	return children?.map((child, index) => {
		let content: React.ReactNode = child.text ?? "";

		if (child.bold) {
			content = <strong>{content}</strong>;
		}

		if (child.italic) {
			content = <em>{content}</em>;
		}

		if (child.underline) {
			content = <span className="underline">{content}</span>;
		}

		return <span key={`${child.text}-${index}`}>{content}</span>;
	});
}

function renderContent(content: unknown) {
	if (typeof content === "string") {
		return <p>{content}</p>;
	}

	if (!isRichTextBlocks(content)) {
		return null;
	}

	return content.map((block, index) => {
		const children = renderTextChildren(block.children);
		const key = `${block.type}-${index}`;

		if (block.type === "heading") {
			if (block.level === 2) {
				return (
					<h2 key={key} className="mt-10 text-2xl font-semibold">
						{children}
					</h2>
				);
			}

			return (
				<h3 key={key} className="mt-8 text-xl font-semibold">
					{children}
				</h3>
			);
		}

		if (block.type === "quote") {
			return (
				<blockquote
					key={key}
					className="border-l-4 border-foreground/20 pl-5 italic text-muted-foreground"
				>
					{children}
				</blockquote>
			);
		}

		return (
			<p key={key} className="leading-8 text-muted-foreground">
				{children}
			</p>
		);
	});
}

export async function generateStaticParams() {
	const articles = await fetchArticles();

	return articles.map((article) => ({
		id: article.documentId,
	}));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
	const { id } = await params;
	const article = await fetchArticle(id);

	if (!article) {
		notFound();
	}

	return (
		<article className="mx-auto w-full max-w-3xl px-6 py-20">
			<Link
				href="/blogs"
				className="mb-10 inline-flex text-sm font-medium text-muted-foreground transition hover:text-foreground"
			>
				Back to articles
			</Link>

			<div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
				{article.category?.name ? (
					<span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
						{article.category.name}
					</span>
				) : null}
				{article.author?.name ? <span>By {article.author.name}</span> : null}
			</div>

			<h1 className="font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
				{article.title}
			</h1>

			{article.description ? (
				<p className="mt-6 text-lg leading-8 text-muted-foreground">
					{article.description}
				</p>
			) : null}

			<div className="mt-12 space-y-6 text-base">
				{renderContent(article.content)}
			</div>
		</article>
	);
}
