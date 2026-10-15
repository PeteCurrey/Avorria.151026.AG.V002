"use client";

import React from "react";
import Link from "next/link";
import { HoverReveal } from "@/components/motion/HoverReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const CAPABILITIES = [
  {
    code: "CAP-01",
    num: "01",
    title: "Web Engineering",
    outcome: "Decoupled Next.js 16 & Vite architectures delivering contractual sub-2.0s LCP and zero runtime shifts.",
    href: "/services/web-engineering",
    stack: "Next.js &middot; React 19 &middot; Vite &middot; Edge SSR",
    previewText: "Sub-2.0s LCP SLA &middot; React 19 RSC",
  },
  {
    code: "CAP-02",
    num: "02",
    title: "AI Systems",
    outcome: "Deterministic multi-agent state machines, structured schema extraction, and auditable LLM pipelines.",
    href: "/services/ai-systems",
    stack: "Node LTS &middot; Python &middot; Supabase Vector &middot; Zod",
    previewText: "Deterministic Agents &middot; Zero Hallucination",
  },
  {
    code: "CAP-03",
    num: "03",
    title: "Performance & SEO",
    outcome: "Surgical code-level deconstruction, third-party script isolation, and strict international hreflang indexing.",
    href: "/services/performance-seo",
    stack: "CWV Audits &middot; Bundle Budget &middot; hreflang &middot; A11y",
    previewText: "Contractual SLA &middot; 100% WCAG 2.2 AA",
  },
  {
    code: "CAP-04",
    num: "04",
    title: "Design & Brand Systems",
    outcome: "Restrained architectural typography, hairline grid layouts, and tokenized design systems.",
    href: "/services/design-brand-systems",
    stack: "Tailwind CSS &middot; Work Sans &middot; Fluid Tokens &middot; GSAP",
    previewText: "Architectural Grid &middot; Fluid Tokens",
  },
];

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="w-full py-24 sm:py-32 bg-ivory text-graphite border-b border-graphite-hairline"
      aria-label="Avorria Capabilities"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-graphite-hairline">
          <SectionHeader
            eyebrow="03 / Core Capabilities"
            heading="Engineering Practices"
            lead="Avorria delivers specialised engineering across four foundational domains. We eliminate framework bloat to deliver guaranteed performance and deterministic AI."
          />
          <Link
            href="/services"
            className="text-xs uppercase tracking-widest font-mono text-rose hover:text-graphite transition-colors underline-sweep shrink-0"
          >
            Explore all services &rarr;
          </Link>
        </div>

        {/* HoverReveal Row List */}
        <div className="space-y-0 divide-y divide-graphite-hairline border-y border-graphite-hairline">
          {CAPABILITIES.map((cap) => (
            <HoverReveal
              key={cap.code}
              variant="row-hover"
              previewText={cap.previewText}
              className="py-8 sm:py-10 group transition-colors duration-200"
            >
              <Link
                href={cap.href}
                className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
              >
                {/* Num & Code */}
                <div className="md:col-span-2 flex items-baseline gap-3">
                  <span className="font-mono text-sm text-rose font-light">
                    {cap.num}
                  </span>
                  <span className="font-mono text-xs text-graphite-muted">
                    [{cap.code}]
                  </span>
                </div>

                {/* Capability Title */}
                <div className="md:col-span-4">
                  <h3 className="font-fluid-h3 font-extralight text-graphite group-hover:text-rose transition-colors duration-200">
                    {cap.title}
                  </h3>
                </div>

                {/* Outcome Summary */}
                <div className="md:col-span-4">
                  <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed font-light">
                    {cap.outcome}
                  </p>
                </div>

                {/* Arrow / Stack */}
                <div className="md:col-span-2 flex items-center md:justify-end gap-2 text-xs font-mono text-graphite-muted group-hover:text-graphite">
                  <span className="hidden xl:inline text-[11px] truncate">{cap.stack}</span>
                  <span className="text-rose text-base transform group-hover:translate-x-1.5 transition-transform duration-200">
                    &rarr;
                  </span>
                </div>
              </Link>
            </HoverReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
