import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { LOBBY_ARTICLES } from "@/content/data/lobby";
import { TEAM_MEMBERS } from "@/content/data/team";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "The Lobby | Architectural Essays & Research",
  description:
    "Engineering standards, system architecture essays, and deterministic AI research published by Avorria leadership.",
  path: "/lobby",
  locale: "en-GB",
  hasUsAlternate: false, // The Lobby is universal global thought leadership
});

export default function LobbyPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "The Lobby", path: "/lobby" },
        ]}
      />

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex items-center justify-between text-xs text-graphite-muted">
          <span className="uppercase tracking-widest text-rose font-light">
            Editorial Dispatch &middot; The Lobby
          </span>
          <a
            href="/lobby/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-rose hover:underline flex items-center gap-1"
          >
            <span>RSS Feed (rss.xml)</span>
            <span>&rarr;</span>
          </a>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          The Lobby
        </h1>
        <p className="text-base text-graphite-muted font-light max-w-2xl leading-relaxed">
          Architectural essays, engineering standards, and production AI research from Avorria leadership. We document real systems engineering challenges and quantitative benchmarks.
        </p>
      </header>

      <div className="space-y-12">
        {LOBBY_ARTICLES.map((article) => {
          const author = TEAM_MEMBERS.find((m) => m.id === article.authorId);
          return (
            <article
              key={article.slug}
              className="border border-graphite-hairline p-8 space-y-4 bg-ivory"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
                <span>Published: {article.publishedAt}</span>
                <span>{article.readingTimeMinutes} min read</span>
              </div>

              <h2 className="text-2xl font-light text-graphite">
                <Link href={`/lobby/${article.slug}`} className="hover:text-rose">
                  {article.title}
                </Link>
              </h2>

              <p className="text-sm text-graphite-muted leading-relaxed">{article.excerpt}</p>

              <div className="pt-4 border-t border-graphite-hairline flex items-center justify-between text-xs">
                <div className="text-graphite-muted">
                  By <span className="text-graphite">{author?.name}</span> &middot; {author?.role}
                </div>
                <Link
                  href={`/lobby/${article.slug}`}
                  className="text-rose hover:underline"
                >
                  Read full article &rarr;
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
