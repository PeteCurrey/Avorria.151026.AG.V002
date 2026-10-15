import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { CASE_STUDIES } from "@/content/data/case-studies";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { WorkIndexView } from "@/components/work/WorkIndexView";

export const metadata = constructMetadata({
  title: "Selected Work & Verified Telemetry (US) | Case Studies",
  description:
    "Explore Avorria's North American engineering case studies and verified architectural benchmarks across Next.js 16 platforms, deterministic AI systems, and design systems.",
  path: "/us/work",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsWorkPage() {
  return (
    <div className="w-full bg-ivory text-graphite min-h-screen">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/us" },
          { name: "Work", path: "/us/work" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24 space-y-16">
        {/* Editorial Header */}
        <header className="space-y-6 max-w-4xl border-b border-graphite-hairline pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-graphite-muted">
            <span className="uppercase tracking-widest text-rose">
              North American Mandates // Verified Production Systems
            </span>
            <Link
              href="/work"
              className="text-graphite hover:text-rose underline transition-colors"
            >
              Switch to UK Engagements (/work) &rarr;
            </Link>
          </div>

          <h1 className="font-fluid-display font-extralight text-graphite tracking-tighter-display">
            Selected Work &amp; Verified Architectures (US)
          </h1>

          <p className="font-fluid-body text-graphite-muted font-light leading-relaxed">
            Avorria delivers performance-first digital infrastructure for ambitious organizations across the United States. We do not invent fictional metrics, generate synthetic case studies, or violate client non-disclosure agreements. Every published telemetry metric is mathematically verifiable against production infrastructure.
          </p>
        </header>

        {/* Interactive Filterable Work Grid */}
        <WorkIndexView caseStudies={CASE_STUDIES} locale="en-US" />
      </div>
    </div>
  );
}
