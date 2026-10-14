import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CAPABILITIES } from "@/content/capabilities";
import { ScrubSection } from "@/components/motion/ScrubSection";

export const metadata: Metadata = {
  title: "Technical Capabilities",
  description:
    "Explore Avorria's specialized engineering capabilities in Next.js App Router, React 19 Server Components, Vite, deterministic enterprise AI systems, and Core Web Vitals optimization.",
  alternates: {
    canonical: "https://avorria.com/capabilities",
  },
};

export default function CapabilitiesPage() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
      {/* Header */}
      <section className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
          <span className="text-xs uppercase tracking-widest text-rose font-light">
            Practice Architecture
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extralight text-graphite tracking-tighter-display">
          Technical Capabilities &amp; Engineering Disciplines
        </h1>
        <p className="text-base sm:text-lg text-graphite-muted font-light leading-relaxed">
          Avorria operates as an elite technical partner for enterprises demanding performance guarantees. We build decoupled, typed web architectures and production AI pipelines without superfluous dependencies.
        </p>
      </section>

      {/* Detailed Capabilities Deconstruction */}
      <div className="space-y-16">
        {CAPABILITIES.map((cap) => (
          <ScrubSection
            key={cap.id}
            id={cap.id}
            className="border border-graphite-hairline bg-ivory p-8 sm:p-12 space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-6" data-scrub-item>
              <div>
                <span className="font-mono text-xs text-rose mr-3">[{cap.code}]</span>
                <span className="text-xs uppercase tracking-wider text-graphite-muted font-light">
                  {cap.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-light text-graphite tracking-tight-display mt-2">
                  {cap.title}
                </h2>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-ivory-subtle border border-graphite-hairline text-graphite self-start sm:self-auto">
                {cap.architectureFocus}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" data-scrub-item>
              <div className="lg:col-span-6 space-y-4">
                <h3 className="text-sm uppercase tracking-wider text-graphite-muted font-light">
                  Operational Thesis
                </h3>
                <p className="text-base text-graphite font-light leading-relaxed">
                  {cap.headline}
                </p>
                <p className="text-sm text-graphite-muted font-light leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-graphite-muted font-light mb-3">
                    Contracted Deliverables
                  </h3>
                  <ul className="space-y-2 text-sm text-graphite font-light">
                    {cap.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-rose">&mdash;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-graphite-hairline">
                  <h3 className="text-xs uppercase tracking-wider text-graphite-muted font-light mb-2">
                    Verified Toolchains
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cap.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-ivory-subtle text-xs text-graphite font-light border border-graphite-hairline"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrubSection>
        ))}
      </div>

      {/* Engagement Prompt */}
      <section className="bg-ivory-subtle border border-graphite-hairline p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-2xl font-light text-graphite tracking-tight-display">
            Require an architectural assessment?
          </h2>
          <p className="text-sm text-graphite-muted font-light">
            Avorria conducts technical feasibility and performance audits for enterprise systems in the UK and USA.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-8 py-4 bg-graphite text-ivory text-xs uppercase tracking-widest font-light hover:bg-rose transition-colors duration-200"
        >
          Submit Mandate Specifications &rarr;
        </Link>
      </section>
    </div>
  );
}
