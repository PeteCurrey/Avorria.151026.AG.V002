import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { CASE_STUDIES } from "@/content/data/case-studies";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Case Studies & Verified Architecture",
  description:
    "Explore Avorria's enterprise client engagements and verified performance benchmarks across institutional finance and regulatory AI.",
  path: "/case-studies",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function CaseStudiesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ]}
      />

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex items-center justify-between text-xs text-graphite-muted">
          <span className="uppercase tracking-widest text-rose font-light">
            Verified Engagements &middot; UK &amp; International
          </span>
          <Link href="/us/case-studies" className="text-graphite hover:text-rose underline">
            View US engagements (/us/case-studies) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Case Studies &amp; Verified Mandates
        </h1>
        <p className="text-base text-graphite-muted font-light max-w-2xl leading-relaxed">
          Avorria strictly respects mutual non-disclosure obligations. We do not publish fabricated statistics or vanity metrics. All documented case studies detail genuine architectural challenges, technical interventions, and verified outcomes.
        </p>
      </header>

      <div className="space-y-12">
        {CASE_STUDIES.map((cs) => (
          <article
            key={cs.id}
            className="border border-graphite-hairline p-8 space-y-6 bg-ivory"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-graphite-hairline pb-4">
              <span className="text-xs uppercase tracking-wider text-graphite-muted">
                {cs.clientSector}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-rose">[{cs.jurisdiction}]</span>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-ivory-subtle border border-graphite-hairline text-graphite">
                  {cs.status}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-light text-graphite">{cs.title}</h2>

            <div className="space-y-4 text-xs text-graphite-muted leading-relaxed">
              <div>
                <strong className="text-graphite block text-xs uppercase tracking-wider mb-1">
                  The Architectural Challenge
                </strong>
                <p>{cs.challenge}</p>
              </div>

              <div>
                <strong className="text-graphite block text-xs uppercase tracking-wider mb-1">
                  Engineered Solution
                </strong>
                <p>{cs.architecture}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-graphite-hairline">
              <span className="text-xs uppercase tracking-wider text-graphite-muted block">
                Verified Outcomes &amp; Metrics
              </span>
              <ul className="space-y-1 text-xs text-graphite">
                {(cs.metrics || []).map((metric, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose font-mono">&bull;</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-graphite-hairline text-[11px] text-graphite-muted space-y-1 font-mono">
              {(cs.visibleFacts || []).map((fact, idx) => (
                <p key={idx}>{fact}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
