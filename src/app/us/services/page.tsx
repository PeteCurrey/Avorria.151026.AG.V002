import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { getServices } from "@/content/data/services";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";

export const metadata = constructMetadata({
  title: "Specialized Engineering Services (US) | Technical Disciplines",
  description:
    "Explore Avorria's four North American engineering disciplines: Web Engineering (Next.js 16, React 19, Vite), Enterprise AI Systems, Performance & SEO, and Design Systems.",
  path: "/us/services",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsServicesPage() {
  const services = getServices("en-US");

  return (
    <div className="w-full bg-ivory text-graphite py-16 sm:py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <BreadcrumbsJsonLd
          items={[
            { name: "US Home", path: "/us" },
            { name: "Services", path: "/us/services" },
          ]}
        />

        {/* Editorial Header */}
        <header className="space-y-6 border-b border-graphite-hairline pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-graphite-muted">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
              <span className="uppercase tracking-widest text-graphite font-light">
                Engineering Disciplines &middot; North America
              </span>
            </div>
            <Link
              href="/services"
              className="text-graphite hover:text-rose underline transition-colors"
            >
              View UK Specification (£ GBP) &rarr;
            </Link>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-fluid-display font-extralight text-graphite tracking-tighter-display">
              Specialized Engineering Services
            </h1>
            <p className="font-fluid-body text-graphite-muted max-w-3xl leading-relaxed font-light">
              Avorria delivers focused technical disciplines for North American enterprises requiring contractual Core Web Vitals guarantees, deterministic AI state machines, and verified accessibility standards. We eliminate framework bloat to deliver immutable performance.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-8 text-xs font-mono text-graphite-muted border-t border-graphite-hairline pt-6">
            <div>
              <span className="text-graphite uppercase text-[10px] tracking-wider block mb-0.5">
                Practice Scope
              </span>
              <span className="text-sm font-light text-graphite">
                4 Specialized Disciplines
              </span>
            </div>
            <div>
              <span className="text-graphite uppercase text-[10px] tracking-wider block mb-0.5">
                Performance Mandate
              </span>
              <span className="text-sm font-light text-rose">
                Sub-2.0s Mobile LCP Contractual SLA
              </span>
            </div>
            <div>
              <span className="text-graphite uppercase text-[10px] tracking-wider block mb-0.5">
                Legal Jurisdiction
              </span>
              <span className="text-sm font-light text-graphite">
                Delaware &middot; New York State (NYC Hub)
              </span>
            </div>
          </div>
        </header>

        {/* 4 Services Grid */}
        <div className="space-y-12">
          {services.map((service) => (
            <article
              key={service.id}
              className="border border-graphite-hairline p-8 sm:p-10 bg-ivory space-y-8 hover:border-graphite transition-all duration-300 relative group"
            >
              {/* Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-graphite-hairline pb-4 text-xs font-mono text-graphite-muted">
                <div className="flex items-center gap-3">
                  <span className="text-rose font-light">[{service.code}]</span>
                  <span className="uppercase tracking-wider">{service.category} (US)</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>Investment: {service.pricingGuidance.range} ({service.pricingGuidance.currency})</span>
                  <span className="text-graphite-hairline">/</span>
                  <span className="text-graphite font-light">
                    {service.engagementDetails?.timelineRange || "8–14 weeks"}
                  </span>
                </div>
              </div>

              {/* Title & Headline */}
              <div className="space-y-3">
                <h2 className="font-fluid-h2 font-extralight text-graphite group-hover:text-rose transition-colors duration-200">
                  <Link href={`/us/services/${service.slug}`}>
                    {service.title}
                  </Link>
                </h2>
                <p className="text-base text-graphite leading-relaxed font-light">
                  {service.headline}
                </p>
                <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Plain-Language Outcome Callout */}
              <div className="p-4 bg-ivory-subtle border-l-2 border-rose border-y border-r border-graphite-hairline">
                <span className="text-[10px] font-mono uppercase tracking-widest text-graphite-muted block mb-1">
                  Guaranteed Technical Outcome
                </span>
                <p className="text-xs sm:text-sm font-light text-graphite italic leading-relaxed">
                  &ldquo;{service.outcomeStatement || service.headline}&rdquo;
                </p>
              </div>

              {/* Deliverables Summary */}
              <div className="space-y-3 pt-2">
                <span className="text-xs uppercase tracking-wider text-graphite-muted block font-mono">
                  Primary Contracted Deliverables:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-graphite font-light">
                  {service.deliverables.slice(0, 4).map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5">
                      <span className="text-rose font-mono text-xs mt-0.5">&mdash;</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions & Tech Tags */}
              <div className="pt-6 border-t border-graphite-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] px-2.5 py-1 bg-ivory-subtle border border-graphite-hairline text-graphite font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/us/services/${service.slug}`}
                  className="text-xs font-mono uppercase tracking-widest text-rose group-hover:text-graphite underline-sweep flex items-center gap-1.5 shrink-0"
                >
                  <span>Inspect Technical Specification (US)</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Global Mandate CTA */}
        <section className="border border-graphite-hairline p-8 sm:p-12 bg-ivory-subtle space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-rose block">
              Direct US Consultation
            </span>
            <h2 className="font-fluid-h2 font-extralight text-graphite">
              Initiate an Engineering Mandate
            </h2>
            <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed font-light">
              Direct partner engagement with our New York office for North American technology executives. All projects governed under Delaware / New York mutual non-disclosure agreements prior to architectural review.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button href="/us/contact" variant="primary" magnetic>
              Inquire on Mandate &rarr;
            </Button>
            <Button href="/us/case-studies" variant="secondary">
              Review Verified Case Studies
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
