"use client";

import React, { useRef } from "react";
import Link from "next/link";
import type { LobbyArticle, TeamMember } from "@/content/schema";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { TableOfContents } from "./TableOfContents";
import { NewsletterCta } from "./NewsletterCta";

interface ArticleDetailViewProps {
  article: LobbyArticle;
  author?: TeamMember;
  relatedArticles: LobbyArticle[];
}

export function ArticleDetailView({
  article,
  author,
  relatedArticles,
}: ArticleDetailViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Render article body with support for ## Headings {#id}, code blocks, and markdown emphasis
  const renderBody = (body: string) => {
    const rawParagraphs = body.split("\n\n");
    const elements: React.ReactNode[] = [];
    let insideCodeBlock = false;
    let codeBlockLanguage = "";
    let codeBlockLines: string[] = [];

    rawParagraphs.forEach((block, idx) => {
      const trimmed = block.trim();

      // Check code block fences
      if (trimmed.startsWith("```")) {
        const lines = trimmed.split("\n");
        const firstLine = lines[0];
        codeBlockLanguage = firstLine.replace("```", "").trim();
        const codeContent = lines.slice(1, lines[lines.length - 1].startsWith("```") ? -1 : undefined).join("\n");
        elements.push(
          <div
            key={`code-${idx}`}
            className="my-8 p-6 bg-graphite text-ivory border border-graphite-hairline font-mono text-xs overflow-x-auto leading-relaxed"
          >
            {codeBlockLanguage && (
              <div className="text-[10px] text-rose font-mono uppercase tracking-widest pb-3 mb-3 border-b border-white/10">
                {codeBlockLanguage}
              </div>
            )}
            <pre className="text-white/90">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
        return;
      }

      // Check H2 headings
      const h2Match = trimmed.match(/^##\s+(.*?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?$/);
      if (h2Match) {
        const title = h2Match[1];
        const id = h2Match[2] || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h2
            key={`h2-${idx}`}
            id={id}
            className="text-2xl sm:text-3xl font-extralight text-graphite tracking-tight pt-8 pb-3 border-b border-graphite-hairline mt-12 scroll-mt-24"
          >
            {title}
          </h2>
        );
        return;
      }

      // Check bullet lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
        elements.push(
          <ul key={`ul-${idx}`} className="space-y-2 my-4 pl-4 list-disc list-outside text-graphite-muted">
            {items.map((item, iIdx) => (
              <li key={iIdx} className="leading-relaxed text-sm sm:text-base font-light text-graphite">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ul>
        );
        return;
      }

      // Regular paragraph
      elements.push(
        <p
          key={`p-${idx}`}
          className="text-base sm:text-lg text-graphite font-light leading-[1.8] my-4"
        >
          {renderInlineFormatting(trimmed)}
        </p>
      );
    });

    return elements;
  };

  // Helper for inline markdown like **bold**, `code`, etc.
  const renderInlineFormatting = (text: string) => {
    // Split by `code` and **bold**
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 bg-ivory-subtle border border-graphite-hairline text-rose font-mono text-[0.88em]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-normal text-graphite">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="relative">
      {/* ScrollTrigger Reading Progress Bar */}
      <ReadingProgressBar targetRef={contentRef} />

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Draft Notice Banner if draft */}
        {article.status === "draft" && (
          <div className="border border-rose/30 bg-rose/5 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-rose font-medium">
                  Draft Specification &middot; Pending Owner Review
                </span>
              </div>
              <p className="text-xs font-light text-graphite-muted">
                This document is marked as an internal technical draft. It is excluded from the public sitemap and carries <code className="text-rose font-mono">noindex</code> directives until formally ratified.
              </p>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-mono border border-rose text-rose uppercase tracking-wider shrink-0">
              Internal Review State
            </span>
          </div>
        )}

        {/* Article Editorial Header */}
        <header className="space-y-8 border-b border-graphite-hairline pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-graphite-muted">
            <div className="flex items-center gap-3">
              <Link
                href="/lobby"
                className="hover:text-rose transition-colors flex items-center gap-1"
              >
                <span>&larr; The Lobby</span>
              </Link>
              <span>/</span>
              <span className="text-rose">{article.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{article.readingTimeMinutes} min read</span>
              <span>&middot;</span>
              <time dateTime={article.publishedAt}>
                Published {article.publishedAt}
              </time>
              {article.updatedAt !== article.publishedAt && (
                <>
                  <span>&middot;</span>
                  <span>Updated {article.updatedAt}</span>
                </>
              )}
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-graphite tracking-tighter-display leading-[1.08] max-w-5xl">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-graphite-muted font-light leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>

          {/* Author Attribution Card */}
          {author && (
            <div className="pt-6 border-t border-graphite-hairline flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-graphite-hairline flex items-center justify-center font-mono text-xs text-graphite bg-ivory">
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="space-y-0.5">
                  <div className="text-sm font-normal text-graphite">
                    {author.name}
                  </div>
                  <div className="text-xs text-graphite-muted font-light">
                    {author.role} &middot; {author.locationCode === "LON" ? "London" : "New York"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <a
                  href={author.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose hover:underline"
                >
                  LinkedIn &rarr;
                </a>
              </div>
            </div>
          )}
        </header>

        {/* Article Grid: Content + Sticky Sidebar */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Article Content */}
          <main className="lg:col-span-8 space-y-6">
            <div className="prose-clean max-w-none">
              {renderBody(article.body)}
            </div>

            {/* Tags Block */}
            <div className="pt-12 mt-12 border-t border-graphite-hairline space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-graphite-muted">
                Architectural Taxonomies
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 bg-ivory border border-graphite-hairline text-graphite"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Extended Bio */}
            {author && (
              <div className="p-8 border border-graphite-hairline bg-ivory space-y-3 mt-12">
                <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
                  About the Author
                </div>
                <h4 className="text-base font-normal text-graphite">
                  {author.name} &mdash; {author.role}
                </h4>
                <p className="text-xs sm:text-sm font-light text-graphite-muted leading-relaxed">
                  {author.bio}
                </p>
              </div>
            )}
          </main>

          {/* Sticky Sidebar: Table of Contents & Quick Actions */}
          <aside className="lg:col-span-4 space-y-8">
            {article.tableOfContents && article.tableOfContents.length > 0 && (
              <TableOfContents items={article.tableOfContents} />
            )}

            <div className="p-6 border border-graphite-hairline bg-ivory space-y-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-graphite-muted">
                Mandate Inquiries
              </div>
              <p className="text-xs font-light text-graphite-muted leading-relaxed">
                Facing complex latency, transatlantic crawl conflicts, or mission-critical AI verification challenges?
              </p>
              <Link
                href="/contact"
                className="block w-full py-2.5 text-center bg-graphite text-ivory text-xs font-mono uppercase tracking-wider hover:bg-rose transition-colors"
              >
                Discuss a Project
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Architectural Reading */}
        {relatedArticles.length > 0 && (
          <section aria-labelledby="related-reading" className="border-t border-graphite-hairline pt-16 space-y-8">
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
                Further Research
              </div>
              <h3 id="related-reading" className="text-2xl sm:text-3xl font-extralight text-graphite tracking-tight">
                Related Architectural Essays
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.slug}
                  className="border border-graphite-hairline p-6 bg-ivory space-y-4 flex flex-col justify-between hover:border-rose/50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-graphite-muted">
                      <span className="text-rose">{rel.category}</span>
                      <span>{rel.readingTimeMinutes}m read</span>
                    </div>
                    <h4 className="text-base font-light text-graphite leading-snug">
                      <Link href={`/lobby/${rel.slug}`} className="hover:text-rose transition-colors">
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-graphite-muted font-light line-clamp-3">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-graphite-hairline text-right">
                    <Link
                      href={`/lobby/${rel.slug}`}
                      className="text-rose text-xs font-mono hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read essay</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA at bottom */}
        <NewsletterCta />
      </div>
    </div>
  );
}
