import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LOBBY_ARTICLES } from "@/content/data/lobby";
import { TEAM_MEMBERS } from "@/content/data/team";
import { constructMetadata } from "@/lib/seo/metadata";
import { ArticleJsonLd, BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

interface LobbyPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LOBBY_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: LobbyPostPageProps) {
  const { slug } = await params;
  const article = LOBBY_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return constructMetadata({
    title: `${article.title} | Avorria Lobby`,
    description: article.excerpt,
    path: `/lobby/${slug}`,
    locale: "en-GB",
    hasUsAlternate: false,
  });
}

export default async function LobbyArticlePage({ params }: LobbyPostPageProps) {
  const { slug } = await params;
  const article = LOBBY_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const author = TEAM_MEMBERS.find((m) => m.id === article.authorId);

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <ArticleJsonLd article={article} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "The Lobby", path: "/lobby" },
          { name: article.title, path: `/lobby/${slug}` },
        ]}
      />

      <header className="space-y-6 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-graphite-muted">
          <span>Published: {article.publishedAt} &middot; Updated: {article.updatedAt}</span>
          <span>{article.readingTimeMinutes} min read</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extralight text-graphite tracking-tighter-display leading-[1.08]">
          {article.title}
        </h1>

        <p className="text-lg text-graphite font-light leading-relaxed">
          {article.excerpt}
        </p>

        {author && (
          <div className="pt-4 border-t border-graphite-hairline flex items-center justify-between text-xs text-graphite-muted">
            <div>
              Authored by <span className="text-graphite font-light">{author.name}</span> &middot; {author.role}
            </div>
            <a
              href={author.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose hover:underline"
            >
              Author Profile &rarr;
            </a>
          </div>
        )}
      </header>

      {/* Essay Content */}
      <section className="space-y-6 text-base text-graphite font-light leading-relaxed">
        {article.body.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="leading-loose">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Tags & Footer Navigation */}
      <footer className="border-t border-graphite-hairline pt-8 space-y-6">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-ivory-subtle border border-graphite-hairline text-graphite font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-graphite-hairline text-xs">
          <Link href="/lobby" className="text-graphite hover:text-rose">
            &larr; Return to The Lobby
          </Link>
          <Link href="/contact" className="text-rose hover:underline">
            Initiate Mandate Discussion &rarr;
          </Link>
        </div>
      </footer>
    </article>
  );
}
