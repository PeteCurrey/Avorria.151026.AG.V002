import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { SERVICES } from "@/content/data/services";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Specialized Engineering Services (US)",
  description:
    "Explore Avorria's North American engineering services in Next.js App Router, React 19 Server Components, Vite, enterprise AI systems, and Core Web Vitals remediation.",
  path: "/us/services",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <BreadcrumbsJsonLd
        items={[
          { name: "US Home", path: "/us" },
          { name: "Services", path: "/us/services" },
        ]}
      />

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex items-center justify-between text-xs text-graphite-muted">
          <span className="uppercase tracking-widest text-rose font-light">
            Service Architecture &middot; North America
          </span>
          <Link href="/services" className="text-graphite hover:text-rose underline">
            View UK pricing &amp; services (/services) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Specialized Engineering Services
        </h1>
        <p className="text-base text-graphite-muted font-light max-w-2xl leading-relaxed">
          Avorria delivers focused engineering disciplines for North American enterprises requiring verifiable performance SLAs, deterministic AI execution, and robust accessibility standards.
        </p>
      </header>

      <div className="space-y-12">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className="border border-graphite-hairline p-8 space-y-6 bg-ivory"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-graphite-hairline pb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-rose">{service.code}</span>
                <span className="text-xs uppercase tracking-wider text-graphite-muted">
                  {service.category}
                </span>
              </div>
              <span className="text-xs font-mono text-graphite-muted">
                Guidance: $60,000 - $250,000 (USD) &middot; Phased Sprints
              </span>
            </div>

            <h2 className="text-2xl font-light text-graphite">
              <Link href={`/us/services/${service.slug}`} className="hover:text-rose">
                {service.title}
              </Link>
            </h2>

            <p className="text-sm text-graphite leading-relaxed">{service.headline}</p>
            <p className="text-xs text-graphite-muted leading-relaxed">{service.description}</p>

            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase tracking-wider text-graphite-muted block">
                Deliverables Included
              </span>
              <ul className="space-y-1 text-xs text-graphite-muted">
                {service.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose">&mdash;</span>
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-graphite-hairline flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-2 py-0.5 bg-ivory-subtle border border-graphite-hairline text-graphite font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Link
                href={`/us/services/${service.slug}`}
                className="text-xs text-rose hover:underline"
              >
                Inspect technical specification &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
