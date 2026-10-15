"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/dist/Flip";
import { HoverReveal } from "@/components/motion/HoverReveal";
import type { CaseStudy } from "@/content/schema";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

interface WorkIndexViewProps {
  caseStudies: CaseStudy[];
  locale?: "en-GB" | "en-US";
}

type MarketFilter = "all" | "UK" | "US" | "Cross-Border";
type ServiceFilter = "all" | "web-engineering" | "ai-systems" | "performance-seo" | "design-brand-systems";

export function WorkIndexView({ caseStudies, locale = "en-GB" }: WorkIndexViewProps) {
  const isUs = locale === "en-US";
  const pathPrefix = isUs ? "/us" : "";
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>("all");
  const [marketFilter, setMarketFilter] = useState<MarketFilter>("all");

  const services = [
    { id: "all", label: "All Disciplines" },
    { id: "web-engineering", label: "Web Engineering" },
    { id: "ai-systems", label: "AI Systems" },
    { id: "performance-seo", label: "Performance & SEO" },
    { id: "design-brand-systems", label: "Design Systems" },
  ];

  const markets = [
    { id: "all", label: "All Markets" },
    { id: "UK", label: "UK (London)" },
    { id: "US", label: "US (New York)" },
    { id: "Cross-Border", label: "Cross-Border" },
  ];

  // Separate verified vs in-progress projects
  const verifiedProjects = caseStudies.filter((cs) => cs.verified);
  const inProgressProjects = caseStudies.filter((cs) => !cs.verified);

  // Filtered verified items
  const filteredVerified = verifiedProjects.filter((item) => {
    const matchesService = serviceFilter === "all" || item.serviceSlug === serviceFilter;
    const matchesMarket = marketFilter === "all" || item.market === marketFilter;
    return matchesService && matchesMarket;
  });

  const filteredInProgress = inProgressProjects.filter((item) => {
    const matchesService = serviceFilter === "all" || item.serviceSlug === serviceFilter;
    const matchesMarket = marketFilter === "all" || item.market === marketFilter;
    return matchesService && matchesMarket;
  });

  const handleFilterChange = (type: "service" | "market", value: string) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !gridRef.current) {
      if (type === "service") setServiceFilter(value as ServiceFilter);
      if (type === "market") setMarketFilter(value as MarketFilter);
      return;
    }

    const state = Flip.getState(".work-flip-item");

    if (type === "service") setServiceFilter(value as ServiceFilter);
    if (type === "market") setMarketFilter(value as MarketFilter);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.03,
        absolute: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, y: -8, duration: 0.25, ease: "power2.in" }),
      });
    });
  };

  return (
    <div className="w-full space-y-16">
      {/* 1. FILTER CONTROLS */}
      <section className="border-y border-graphite-hairline py-6 space-y-6 bg-ivory-subtle/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Service Disciplines */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-graphite-muted block">
              Discipline
            </span>
            <div className="flex flex-wrap gap-2">
              {services.map((svc) => {
                const isActive = serviceFilter === svc.id;
                return (
                  <button
                    key={svc.id}
                    onClick={() => handleFilterChange("service", svc.id)}
                    className={`px-3 py-1.5 text-xs font-mono transition-all duration-200 border ${
                      isActive
                        ? "bg-graphite text-ivory border-graphite shadow-sm"
                        : "bg-ivory text-graphite-muted border-graphite-hairline hover:border-graphite hover:text-graphite"
                    }`}
                  >
                    {svc.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Market / Jurisdiction */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-graphite-muted block">
              Jurisdiction / Market
            </span>
            <div className="flex flex-wrap gap-2">
              {markets.map((mkt) => {
                const isActive = marketFilter === mkt.id;
                return (
                  <button
                    key={mkt.id}
                    onClick={() => handleFilterChange("market", mkt.id)}
                    className={`px-3 py-1.5 text-xs font-mono transition-all duration-200 border ${
                      isActive
                        ? "bg-rose text-ivory border-rose shadow-sm"
                        : "bg-ivory text-graphite-muted border-graphite-hairline hover:border-rose hover:text-graphite"
                    }`}
                  >
                    {mkt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-graphite-muted pt-2 border-t border-graphite-hairline/60">
          <span>
            Displaying {filteredVerified.length + filteredInProgress.length} of {caseStudies.length} architectures
          </span>
          <span className="text-rose text-[11px]">
            &bull; Strict verification rule active: unverified metrics suppressed
          </span>
        </div>
      </section>

      {/* 2. VERIFIED FLAGSHIP CASE STUDIES */}
      <section className="space-y-8" ref={gridRef}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-rose animate-pulse" />
            <h2 className="text-xs font-mono uppercase tracking-widest text-graphite">
              Verified Public Architectures
            </h2>
          </div>
          <p className="text-sm font-light text-graphite-muted max-w-2xl">
            Fully audit-certified systems with real-world before/after telemetry. Public metrics are mathematically verified against production infrastructure.
          </p>
        </div>

        {filteredVerified.length === 0 ? (
          <div className="border border-graphite-hairline p-8 text-center text-sm font-mono text-graphite-muted bg-ivory-subtle">
            No verified architectures match the selected filter combination.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredVerified.map((cs) => {
              const verifiedMetrics = cs.performanceMetrics?.filter((m) => m.verified) || [];

              return (
                <div key={cs.id} className="work-flip-item flex flex-col h-full">
                  <HoverReveal variant="card-lift" className="h-full">
                    <Link
                      href={`${pathPrefix}/work/${cs.slug}`}
                      className="group flex flex-col justify-between h-full border border-graphite-hairline p-8 sm:p-10 bg-ivory hover:border-graphite transition-colors duration-300 relative"
                    >
                      {/* Top Badges */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-graphite-hairline pb-4">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-graphite-muted">
                            {cs.clientSector}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 border border-rose text-rose">
                              Verified Architecture
                            </span>
                            <span className="text-[10px] font-mono text-graphite-muted">
                              [{cs.market}]
                            </span>
                          </div>
                        </div>

                        {/* Title and summary */}
                        <div className="space-y-3">
                          <h3 className="font-fluid-h2 font-extralight text-graphite group-hover:text-rose transition-colors duration-200">
                            {cs.title}
                          </h3>
                          <p className="text-sm text-graphite-muted font-light leading-relaxed">
                            {cs.summary}
                          </p>
                        </div>
                      </div>

                      {/* Verified Performance Metrics Preview (Only Verified Fields Render) */}
                      {verifiedMetrics.length > 0 && (
                        <div className="my-6 pt-4 border-t border-graphite-hairline/60">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-graphite-muted block mb-3">
                            Verified Production Telemetry
                          </span>
                          <div className="grid grid-cols-2 gap-4">
                            {verifiedMetrics.slice(0, 2).map((m, idx) => (
                              <div key={idx} className="bg-ivory-subtle p-3 border border-graphite-hairline">
                                <span className="text-[10px] font-mono text-graphite-muted block truncate">
                                  {m.label}
                                </span>
                                <div className="flex items-baseline gap-2 mt-1">
                                  <span className="text-xs line-through text-graphite-muted/80 font-mono">
                                    {m.before}
                                  </span>
                                  <span className="text-sm font-light text-rose font-mono">
                                    &rarr; {m.after}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer & Stack */}
                      <div className="pt-4 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
                        <div className="flex flex-wrap gap-2 max-w-[80%]">
                          {cs.techStack.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2 py-0.5 bg-ivory-subtle text-graphite border border-graphite-hairline"
                            >
                              {tech}
                            </span>
                          ))}
                          {cs.techStack.length > 3 && (
                            <span className="text-[11px] text-graphite-muted self-center">
                              +{cs.techStack.length - 3} more
                            </span>
                          )}
                        </div>
                        <span className="text-graphite group-hover:translate-x-1 group-hover:text-rose transition-all">
                          Read Case Study &rarr;
                        </span>
                      </div>
                    </Link>
                  </HoverReveal>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. SELECTED PROJECTS IN PROGRESS (Strictly Unverified Metrics Suppressed) */}
      <section className="space-y-6 pt-12 border-t border-graphite-hairline">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-graphite-muted">
              Selected Projects in Progress &amp; Confidential Mandates
            </h2>
            <span className="text-[10px] font-mono text-graphite-muted">
              Mutual NDA Enforced
            </span>
          </div>
          <p className="text-xs font-light text-graphite-muted max-w-3xl leading-relaxed">
            Avorria strictly prohibits publishing unverified client performance claims, fictional quotes, or synthetic metrics. Mandates currently under active engineering or awaiting third-party certification are summarized below without speculative data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInProgress.map((cs) => (
            <div
              key={cs.id}
              className="work-flip-item border border-graphite-hairline/80 p-6 bg-ivory-subtle/60 space-y-4 relative"
            >
              <div className="flex items-center justify-between border-b border-graphite-hairline/60 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-graphite-muted">
                  {cs.clientSector}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-graphite-hairline text-graphite-muted bg-ivory">
                  {cs.status}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-light text-graphite">
                  {cs.title}
                </h3>
                <p className="text-xs text-graphite-muted leading-relaxed font-light">
                  {cs.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-graphite-hairline/60 flex items-center justify-between text-xs font-mono text-graphite-muted">
                <span>Market: [{cs.market}]</span>
                <span className="text-rose text-[11px]">
                  Telemetric verification pending production sign-off
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
