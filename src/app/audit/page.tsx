import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { AuditForm } from "@/components/forms/AuditForm";

export const metadata = constructMetadata({
  title: "Free Architectural Site Audit | Core Web Vitals & Systems Diagnosis",
  description:
    "Commission a rigorous, zero-cost architectural evaluation of your production web platform. Real cellular network throttling, crawl graph analysis, and dependency audits.",
  path: "/audit",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function AuditPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Architectural Audit", path: "/audit" },
        ]}
      />

      {/* Header */}
      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-graphite-muted">
          <span className="uppercase tracking-widest text-rose font-medium">
            Authority Diagnostic &middot; London Hub
          </span>
          <Link
            href="/us/audit"
            className="text-graphite hover:text-rose underline"
          >
            US Enterprise Audit Portal (/us/audit) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extralight text-graphite tracking-tighter-display">
          Platform Architecture Audit
        </h1>
        <p className="text-base sm:text-lg text-graphite-muted font-light max-w-3xl leading-relaxed">
          We perform comprehensive technical evaluations for ambitious corporate platforms. We evaluate real field Core Web Vitals, transatlantic crawl budget conflicts, bundle bloat, and AI readiness — delivered directly to engineering leadership.
        </p>
      </header>

      {/* 2-Column: Methodology and Intake Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: What the Audit Delivers */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 border border-graphite-hairline bg-ivory space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
              What You Receive
            </div>

            <div className="space-y-4 text-xs font-light text-graphite">
              <div className="space-y-1">
                <strong className="font-normal block text-graphite text-sm">
                  1. Real Throttled Field Telemetry
                </strong>
                <p className="text-graphite-muted leading-relaxed">
                  Laboratory scores on fiber connections are misleading. We measure your LCP, CLS, and INP under 4G throttling on mid-tier mobile hardware.
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-graphite-hairline">
                <strong className="font-normal block text-graphite text-sm">
                  2. Crawl Graph &amp; Hreflang Reciprocity
                </strong>
                <p className="text-graphite-muted leading-relaxed">
                  Complete crawl inspection identifying duplicate canonicals, unindexed URLs, hreflang reciprocity failures, and render budget waste.
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-graphite-hairline">
                <strong className="font-normal block text-graphite text-sm">
                  3. Tag Map &amp; Supply Chain Risk
                </strong>
                <p className="text-graphite-muted leading-relaxed">
                  Analysis of all external network requests, unmeasured third-party scripts, and client-side execution waterfalls blocking the main thread.
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-graphite-hairline">
                <strong className="font-normal block text-graphite text-sm">
                  4. Ranked Remediation Backlog
                </strong>
                <p className="text-graphite-muted leading-relaxed">
                  A concrete, prioritized backlog with engineering effort estimates rather than vague marketing suggestions.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border border-graphite-hairline bg-ivory-subtle space-y-2 text-xs font-mono text-graphite-muted">
            <div className="text-graphite font-normal">Confidentiality Guarantee:</div>
            <p className="leading-relaxed">
              All findings are proprietary to your organization and delivered under strict professional confidence. Zero public case studies without prior written consent.
            </p>
          </div>
        </div>

        {/* Right: Intake Form */}
        <div className="lg:col-span-7">
          <AuditForm market="UK" />
        </div>
      </div>
    </div>
  );
}
