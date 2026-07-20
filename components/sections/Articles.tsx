import Link from "next/link";

export type Article = {
	documentId: string;
	title: string;
	description: string | null;
	slug: string | null;
	category: {
		name: string;
	} | null;
	author: {
		name: string;
	} | null;
	content: unknown;
	publishedAt: string | null;
};

type ArticlesProps = {
	articles: Article[];
};

function formatDate(date: string | null) {
	if (!date) {
		return "Unpublished";
	}

	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(date));
}

function getArticleHref(article: Article) {
	return `/blogs/${article.documentId}`;
}

function richTextToText(value: unknown): string {
	if (!value) {
		return "";
	}

	if (typeof value === "string") {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(richTextToText).filter(Boolean).join(" ");
	}

	if (typeof value === "object") {
		const block = value as {
			text?: unknown;
			children?: unknown;
		};

		return [richTextToText(block.text), richTextToText(block.children)]
			.filter(Boolean)
			.join(" ");
	}

	return "";
}

export default function Articles({ articles }: ArticlesProps) {
	if (articles.length === 0) {
		return (
			<section className="mx-auto w-full max-w-6xl px-6 py-20">
				<p className="text-sm text-muted-foreground">No articles found.</p>
			</section>
		);
	}

	return (
		<section className="mx-auto w-full max-w-6xl px-6 py-20">
			<div className="mb-10 max-w-2xl">
				<p className="mb-3 text-sm font-medium text-muted-foreground">
					Articles
				</p>
				<h1 className="font-heading text-4xl font-semibold tracking-normal text-foreground">
					Latest articles
				</h1>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{articles.map((article) => {
					const contentPreview = richTextToText(article.content);

					return (
						<article
							key={article.documentId}
							className="flex min-h-72 flex-col rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm"
						>
							<div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
								{article.category?.name ? (
									<span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
										{article.category.name}
									</span>
								) : null}
								<span>{formatDate(article.publishedAt)}</span>
							</div>

							<h2 className="font-heading text-xl font-semibold leading-tight text-foreground">
								<Link href={getArticleHref(article)}>{article.title}</Link>
							</h2>

							{article.description ? (
								<p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
									{article.description}
								</p>
							) : null}

							{contentPreview ? (
								<p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">
									{contentPreview}
								</p>
							) : null}

							<div className="mt-auto pt-6 text-sm text-muted-foreground">
								{article.author?.name ? (
									<span>By {article.author.name}</span>
								) : (
									<span>Author unavailable</span>
								)}
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
