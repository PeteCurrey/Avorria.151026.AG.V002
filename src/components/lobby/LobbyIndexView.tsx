"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { LobbyArticle } from "@/content/schema";
import { TEAM_MEMBERS } from "@/content/data/team";
import { CATEGORY_REGISTRY } from "@/content/data/lobby";
import { NewsletterCta } from "./NewsletterCta";

interface LobbyIndexViewProps {
  articles: LobbyArticle[];
  categories: string[];
  initialCategory?: string;
  currentPage?: number;
  totalPages?: number;
  categoryIntro?: string;
}

export function LobbyIndexView({
  articles,
  categories,
  initialCategory,
  currentPage = 1,
  totalPages = 1,
  categoryIntro,
}: LobbyIndexViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "All"
  );

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  // Identify featured article (only on page 1 of All)
  const featuredArticle =
    selectedCategory === "All" && currentPage === 1
      ? filteredArticles.find((a) => a.featured) || filteredArticles[0]
      : null;

  const standardArticles = featuredArticle
    ? filteredArticles.filter((a) => a.slug !== featuredArticle.slug)
    : filteredArticles;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      {/* Editorial Header */}
      <header className="space-y-6 border-b border-graphite-hairline pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose inline-block" />
            <span className="uppercase tracking-widest text-graphite-muted font-mono text-[11px]">
              Avorria Research &middot; The Lobby
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/lobby/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-rose hover:underline flex items-center gap-1.5"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="19" r="1" />
              </svg>
              <span>RSS Feed</span>
            </a>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extralight text-graphite tracking-tighter-display">
          The Lobby
        </h1>

        <p className="text-base sm:text-lg text-graphite-muted font-light max-w-3xl leading-relaxed">
          {categoryIntro ||
            "Architectural essays, engineering standards, and production AI research published by Avorria leadership. We document real systems engineering challenges, compiler trade-offs, and quantitative Core Web Vitals telemetry."}
        </p>
      </header>

      {/* Category Navigation Pills */}
      <nav
        aria-label="Category filter"
        className="flex flex-wrap items-center gap-2 border-b border-graphite-hairline pb-6"
      >
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3.5 py-1.5 text-xs font-mono transition-colors cursor-pointer border ${
            selectedCategory === "All"
              ? "bg-graphite text-ivory border-graphite"
              : "bg-ivory text-graphite-muted border-graphite-hairline hover:text-graphite hover:border-graphite"
          }`}
        >
          All ({articles.length})
        </button>
        {categories.map((cat) => {
          const count = articles.filter((a) => a.category === cat).length;
          const reg = CATEGORY_REGISTRY[cat];
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-mono transition-colors cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-graphite text-ivory border-graphite"
                  : "bg-ivory text-graphite-muted border-graphite-hairline hover:text-graphite hover:border-graphite"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </nav>

      {/* Featured Article Hero (if present) */}
      {featuredArticle && (
        <section aria-labelledby="featured-piece" className="space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
            Featured Architectural Essay
          </div>
          <article className="border border-graphite-hairline bg-ivory p-8 sm:p-12 space-y-6 hover:border-rose/60 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-4">
              <div className="flex items-center gap-3">
                <span className="text-rose font-medium">
                  {featuredArticle.category}
                </span>
                <span>&middot;</span>
                <span>{featuredArticle.readingTimeMinutes} min read</span>
                {featuredArticle.status === "draft" && (
                  <>
                    <span>&middot;</span>
                    <span className="px-1.5 py-0.5 text-[10px] bg-rose/10 text-rose border border-rose/30 uppercase tracking-widest">
                      Draft Spec
                    </span>
                  </>
                )}
              </div>
              <time dateTime={featuredArticle.publishedAt}>
                {featuredArticle.publishedAt}
              </time>
            </div>

            <div className="space-y-4 max-w-4xl">
              <h2
                id="featured-piece"
                className="text-2xl sm:text-4xl font-extralight text-graphite tracking-tight leading-[1.15]"
              >
                <Link
                  href={`/lobby/${featuredArticle.slug}`}
                  className="hover:text-rose transition-colors"
                >
                  {featuredArticle.title}
                </Link>
              </h2>
              <p className="text-base text-graphite-muted font-light leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-graphite-hairline flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-graphite-muted">
                {(() => {
                  const author = TEAM_MEMBERS.find(
                    (m) => m.id === featuredArticle.authorId
                  );
                  return (
                    <span>
                      Authored by{" "}
                      <strong className="text-graphite font-normal">
                        {author?.name}
                      </strong>{" "}
                      &middot; {author?.role}
                    </span>
                  );
                })()}
              </div>
              <Link
                href={`/lobby/${featuredArticle.slug}`}
                className="text-rose hover:underline font-mono flex items-center gap-1"
              >
                <span>Read Full Essay</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </article>
        </section>
      )}

      {/* Editorial Grid of Standard Articles */}
      <section aria-label="Articles index" className="space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-graphite-muted">
          <span>
            Displaying {standardArticles.length} of {filteredArticles.length}{" "}
            entries
          </span>
          {selectedCategory !== "All" && (
            <Link
              href={`/lobby/category/${CATEGORY_REGISTRY[selectedCategory]?.slug || ""}`}
              className="text-rose hover:underline"
            >
              View dedicated {selectedCategory} hub &rarr;
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {standardArticles.map((article) => {
            const author = TEAM_MEMBERS.find((m) => m.id === article.authorId);
            return (
              <article
                key={article.slug}
                className="border border-graphite-hairline p-8 space-y-6 bg-ivory flex flex-col justify-between hover:border-graphite/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-rose">{article.category}</span>
                      {article.status === "draft" && (
                        <span className="px-1 py-0.2 text-[9px] bg-rose/10 text-rose border border-rose/30 uppercase">
                          Draft
                        </span>
                      )}
                    </div>
                    <span>{article.readingTimeMinutes}m read</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-light text-graphite leading-snug">
                    <Link
                      href={`/lobby/${article.slug}`}
                      className="hover:text-rose transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-graphite-hairline space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 bg-ivory-subtle border border-graphite-hairline text-graphite-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-graphite-muted pt-2">
                    <span className="truncate max-w-[200px]">
                      By {author?.name}
                    </span>
                    <Link
                      href={`/lobby/${article.slug}`}
                      className="text-rose hover:underline font-mono text-[11px] shrink-0"
                    >
                      Read &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Pagination (if applicable) */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-center gap-2 pt-8 border-t border-graphite-hairline"
        >
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCurrent = pageNum === currentPage;
            return (
              <span
                key={pageNum}
                className={`px-3 py-1.5 text-xs font-mono border ${
                  isCurrent
                    ? "bg-graphite text-ivory border-graphite"
                    : "border-graphite-hairline text-graphite-muted hover:text-graphite"
                }`}
              >
                {pageNum}
              </span>
            );
          })}
        </nav>
      )}

      {/* Quarterly Dispatch Email Capture */}
      <NewsletterCta />
    </div>
  );
}
