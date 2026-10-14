import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { SERVICES } from "@/content/data/services";
import { CASE_STUDIES } from "@/content/data/case-studies";
import { LOBBY_ARTICLES } from "@/content/data/lobby";
import { LOCATIONS } from "@/content/data/locations";

export const metadata = constructMetadata({
  title: "Performance-First Web Platforms & AI Systems",
  description:
    "Avorria architects bespoke performance-first Next.js, Vite, and React web platforms and production AI systems for enterprise clients in the UK and USA.",
  path: "/",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function HomePage() {
  const ukHub = LOCATIONS.find((l) => l.code === "LON")!;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
      {/* Editorial Header / Foundation Overview */}
      <section className="space-y-6 border-b border-graphite-hairline pb-12">
        <div className="flex items-center justify-between text-xs text-graphite-muted">
          <span className="uppercase tracking-widest text-rose font-light">
            Technical Foundation &middot; en-GB
          </span>
          <Link href="/us" className="text-graphite hover:text-rose underline">
            View US Operations (/us) &rarr;
          </Link>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extralight text-graphite tracking-tighter-display">
          Avorria
        </h1>
        <p className="text-lg text-graphite-muted font-light leading-relaxed max-w-3xl">
          Architectural digital engineering practice delivering performance-first Next.js, Vite, and React web platforms and production-hardened AI systems. Governed under English corporate law in London and Delaware/New York law in the United States.
        </p>

        <div className="pt-2 flex flex-wrap gap-6 text-xs text-graphite-muted">
          <span>Headquarters: {ukHub.city}, {ukHub.country}</span>
          <span>&middot;</span>
          <span>Contact: {ukHub.telephone}</span>
          <span>&middot;</span>
          <span>SLA: Mobile LCP &lt; 2.0s</span>
        </div>
      </section>

      {/* Services Index */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-graphite-hairline pb-4">
          <h2 className="text-2xl font-light text-graphite">Specialised Engineering Services</h2>
          <Link href="/services" className="text-xs text-rose hover:underline">
            View all services &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((srv) => (
            <div key={srv.id} className="border border-graphite-hairline p-6 space-y-4">
              <span className="font-mono text-xs text-rose">{srv.code}</span>
              <h3 className="text-lg font-light text-graphite">
                <Link href={`/services/${srv.slug}`} className="hover:text-rose">
                  {srv.title}
                </Link>
              </h3>
              <p className="text-xs text-graphite-muted leading-relaxed">{srv.summary}</p>
              <div className="pt-2 text-xs font-mono text-graphite-muted">
                Guidance: {srv.pricingGuidance.range} ({srv.pricingGuidance.currency})
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Case Studies / Engagement Slots */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-graphite-hairline pb-4">
          <h2 className="text-2xl font-light text-graphite">Case Studies &amp; Mandates</h2>
          <Link href="/case-studies" className="text-xs text-rose hover:underline">
            View all case studies &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.id} className="border border-graphite-hairline p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-graphite-muted">
                <span>{cs.clientSector}</span>
                <span className="font-mono text-rose">[{cs.jurisdiction}]</span>
              </div>
              <h3 className="text-base font-light text-graphite">{cs.title}</h3>
              <p className="text-xs text-graphite-muted leading-relaxed">{cs.challenge}</p>
              <span className="inline-block text-[11px] font-mono px-2 py-0.5 bg-ivory-subtle border border-graphite-hairline text-graphite">
                {cs.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* The Lobby (Editorial) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-graphite-hairline pb-4">
          <h2 className="text-2xl font-light text-graphite">The Lobby &middot; Architectural Essays</h2>
          <Link href="/lobby" className="text-xs text-rose hover:underline">
            Read all articles &rarr;
          </Link>
        </div>

        <div className="space-y-4">
          {LOBBY_ARTICLES.map((article) => (
            <article key={article.slug} className="border border-graphite-hairline p-6 space-y-2">
              <div className="text-xs font-mono text-graphite-muted">
                Published: {article.publishedAt} &middot; {article.readingTimeMinutes} min read
              </div>
              <h3 className="text-xl font-light text-graphite">
                <Link href={`/lobby/${article.slug}`} className="hover:text-rose">
                  {article.title}
                </Link>
              </h3>
              <p className="text-xs text-graphite-muted leading-relaxed">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Direct Channel */}
      <section className="border border-graphite-hairline p-8 bg-ivory-subtle space-y-4 text-center">
        <h2 className="text-2xl font-light text-graphite">Initiate an Engineering Mandate</h2>
        <p className="text-sm text-graphite-muted max-w-xl mx-auto leading-relaxed">
          Direct communication with engineering partners in London and New York. All projects governed under mutual non-disclosure.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-graphite text-ivory text-xs uppercase tracking-widest font-light hover:bg-rose transition-colors"
          >
            Access Inquiry Terminal &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
