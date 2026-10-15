"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Service, CaseStudy, LobbyArticle } from "@/content/schema";
import { HoverReveal } from "@/components/motion/HoverReveal";
import { Button } from "@/components/ui/Button";

interface ServiceDetailViewProps {
  service: Service;
  locale: "en-GB" | "en-US";
  relatedCaseStudies: CaseStudy[];
  relatedLobbyArticles: LobbyArticle[];
}

export function ServiceDetailView({
  service,
  locale,
  relatedCaseStudies,
  relatedLobbyArticles,
}: ServiceDetailViewProps) {
  const isUs = locale === "en-US";
  const prefix = isUs ? "/us" : "";
  const alternateLocaleHref = isUs
    ? `/services/${service.slug}`
    : `/us/services/${service.slug}`;

  const deliveryRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced || !deliveryRef.current || !service.deliveryPhases) return;

    const el = deliveryRef.current;
    const phaseCount = service.deliveryPhases.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${phaseCount * 90}%`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          setScrubProgress(self.progress);
          const index = Math.min(phaseCount - 1, Math.floor(self.progress * phaseCount));
          setActivePhase(index);
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, [service.deliveryPhases]);

  return (
    <article className="w-full bg-ivory text-graphite pb-24">
      {/* 1. EDITORIAL HERO */}
      <header className="w-full border-b border-graphite-hairline py-16 sm:py-24 px-6 sm:px-8 lg:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-4">
            <div className="flex items-center gap-3">
              <span className="text-rose font-light">[{service.code}]</span>
              <span className="uppercase tracking-widest">{service.category}</span>
              <span className="text-graphite-hairline">/</span>
              <span className="text-graphite">
                {isUs ? "United States Specification" : "United Kingdom Specification"}
              </span>
            </div>
            <Link
              href={alternateLocaleHref}
              className="text-graphite hover:text-rose underline transition-colors"
            >
              {isUs ? "Switch to UK Specification (£ GBP) &rarr;" : "Switch to US Specification ($ USD) &rarr;"}
            </Link>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="font-fluid-display font-extralight text-graphite tracking-tighter-display">
              {service.title}
            </h1>
            <p className="font-fluid-body text-graphite-muted leading-relaxed font-light">
              {service.headline}
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-8 text-xs font-mono text-graphite border-t border-graphite-hairline pt-6">
            <div>
              <span className="text-graphite-muted block uppercase text-[10px] tracking-wider mb-0.5">
                Guidance Investment
              </span>
              <span className="text-sm font-light text-rose">
                {service.pricingGuidance.range} ({service.pricingGuidance.currency})
              </span>
            </div>
            <div>
              <span className="text-graphite-muted block uppercase text-[10px] tracking-wider mb-0.5">
                Delivery Timeline
              </span>
              <span className="text-sm font-light text-graphite">
                {service.engagementDetails?.timelineRange || "8–14 weeks"}
              </span>
            </div>
            <div>
              <span className="text-graphite-muted block uppercase text-[10px] tracking-wider mb-0.5">
                Architecture SLA
              </span>
              <span className="text-sm font-light text-graphite">
                Mobile LCP &lt; 2.0s &middot; 100% WCAG 2.2 AA
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. PLAIN-LANGUAGE OUTCOME STATEMENT */}
      <section className="w-full border-b border-graphite-hairline py-16 px-6 sm:px-8 lg:px-12 bg-ivory-subtle/60">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-rose block">
            Executive Outcome Statement
          </span>
          <blockquote className="font-fluid-h2 font-extralight text-graphite tracking-tight-display max-w-4xl border-l-2 border-rose pl-6 sm:pl-8 py-2">
            &ldquo;{service.outcomeStatement || service.headline}&rdquo;
          </blockquote>
          <p className="text-xs font-mono text-graphite-muted pt-2 pl-6 sm:pl-8">
            Verifiable milestone metric embedded directly into statement-of-work commercial contracts.
          </p>
        </div>
      </section>

      {/* 3. AI SYSTEMS SPECIAL SECTION: 4 REAL CATEGORIES OF WORK & BRAND DIAGRAM */}
      {service.slug === "ai-systems" && service.aiCategories && (
        <section className="w-full border-b border-graphite-hairline py-20 px-6 sm:px-8 lg:px-12 bg-ivory">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-rose block">
                Production Classification &middot; Zero Speculation
              </span>
              <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
                Four Verified Categories of Enterprise AI
              </h2>
              <p className="text-sm sm:text-base font-light text-graphite-muted leading-relaxed">
                Avorria does not trade on generative novelty, synthetic demo videos, or autonomous black-box agents. We design and build systems within four bounded categories governed by deterministic state machines, vector retrieval, and authenticated human sign-off.
              </p>
            </div>

            {/* Architectural Workflow Diagram in Brand Palette */}
            <div className="p-8 border border-graphite-hairline bg-ivory-subtle space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
                <span className="uppercase text-graphite">Deterministic AI Pipeline Architecture</span>
                <span className="text-rose">Brand Palette Specification &middot; Ivory / Graphite / Rose</span>
              </div>

              {/* Diagram Flow */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 border border-graphite-hairline bg-ivory space-y-2">
                  <span className="text-[10px] uppercase text-rose block">01. Ingestion</span>
                  <div className="font-light text-graphite text-xs">Statutory Filings &amp; Schema Inbound</div>
                  <p className="text-[11px] text-graphite-muted font-light leading-normal">
                    Strict Zod schema validation gate; non-conforming inputs rejected immediately.
                  </p>
                </div>
                <div className="p-4 border border-graphite-hairline bg-ivory space-y-2">
                  <span className="text-[10px] uppercase text-rose block">02. Retrieval</span>
                  <div className="font-light text-graphite text-xs">pgvector Semantic Cache</div>
                  <p className="text-[11px] text-graphite-muted font-light leading-normal">
                    Dense vector similarity matching with BM25 hybrid indexing and similarity caching.
                  </p>
                </div>
                <div className="p-4 border border-graphite-hairline bg-ivory space-y-2">
                  <span className="text-[10px] uppercase text-rose block">03. Inference</span>
                  <div className="font-light text-graphite text-xs">Constrained LLM State Machine</div>
                  <p className="text-[11px] text-graphite-muted font-light leading-normal">
                    Tool invocations bounded by formal state-machine rules and cryptographic audit trails.
                  </p>
                </div>
                <div className="p-4 border border-graphite-hairline bg-graphite text-ivory space-y-2">
                  <span className="text-[10px] uppercase text-rose-dark block">04. Governance</span>
                  <div className="font-light text-xs text-ivory">Human-in-the-Loop Sign-off</div>
                  <p className="text-[11px] text-graphite-muted font-light leading-normal">
                    High-impact transitions require explicit authenticated sign-off before state commit.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.aiCategories.map((cat, idx) => (
                <div
                  key={cat.title}
                  className="border border-graphite-hairline p-8 bg-ivory space-y-4 relative hover:border-graphite transition-colors duration-200"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
                    <span className="text-rose">CAT-0{idx + 1}</span>
                    <span className="uppercase tracking-wider text-[11px]">{cat.title}</span>
                  </div>

                  <h3 className="font-fluid-h3 font-extralight text-graphite">
                    {cat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite font-light leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-graphite-hairline/60">
                    <div className="text-xs font-mono text-graphite-muted">
                      <span className="text-graphite font-light">Architecture: </span>
                      {cat.architecture}
                    </div>

                    {cat.caseStudyRef && (
                      <div className="p-3 bg-ivory-subtle border border-graphite-hairline text-[11px] font-mono text-rose">
                        <span className="uppercase block text-[10px] text-graphite-muted mb-0.5">
                          Evidence Attribution:
                        </span>
                        {cat.caseStudyRef}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. HOW WE DELIVER (SCRUBBED PINNED SEQUENCE WITH HOVERREVEAL) */}
      {service.deliveryPhases && (
        <section
          ref={deliveryRef}
          className="relative w-full min-h-screen bg-ivory text-graphite flex flex-col justify-between overflow-hidden border-b border-graphite-hairline"
          aria-label="Delivery Methodology"
        >
          {/* Header */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 flex items-center justify-between z-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-rose block mb-1">
                Methodology &middot; Pinned Sequence
              </span>
              <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
                How We Deliver
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-graphite-muted">
              <span>Scrub Progress: {Math.round(scrubProgress * 100)}%</span>
              <div className="w-20 h-[1px] bg-graphite-hairline relative">
                <div
                  className="absolute top-0 left-0 h-full bg-rose"
                  style={{ width: `${Math.round(scrubProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Scrubbed Stage */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 py-12">
            {/* Left: Phase Indicators */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-extralight text-[6rem] sm:text-[8rem] lg:text-[10rem] leading-none text-graphite tracking-tighter block select-none">
                {service.deliveryPhases[activePhase]?.num || "01"}
              </span>

              <div className="space-y-3">
                {service.deliveryPhases.map((phase, idx) => (
                  <div
                    key={phase.num}
                    className={`p-3 border transition-all duration-300 ${
                      activePhase === idx
                        ? "border-graphite bg-ivory-subtle translate-x-2"
                        : "border-graphite-hairline/60 opacity-40"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={activePhase === idx ? "text-rose" : "text-graphite-muted"}>
                        Phase {phase.num}
                      </span>
                      <span className="text-graphite font-light">{phase.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Active Phase Content with HoverReveal on Deliverables */}
            <div className="lg:col-span-7 border border-graphite-hairline bg-ivory-subtle p-8 sm:p-12 space-y-6 shadow-sm">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-rose tracking-wider block">
                  Active Milestone Scope
                </span>
                <h3 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
                  {service.deliveryPhases[activePhase]?.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base font-light text-graphite-muted leading-relaxed">
                {service.deliveryPhases[activePhase]?.description}
              </p>

              <div className="pt-4 border-t border-graphite-hairline space-y-3">
                <span className="text-xs font-mono text-graphite uppercase tracking-wider block">
                  Contracted Deliverables (Interactive Hover Inspect):
                </span>
                <div className="space-y-2">
                  {service.deliveryPhases[activePhase]?.deliverables.map((deliv, dIdx) => (
                    <HoverReveal
                      key={dIdx}
                      variant="row-hover"
                      previewText={`Phase ${service.deliveryPhases![activePhase].num} · Deliverable`}
                      className="py-2.5"
                    >
                      <div className="flex items-start gap-3 text-xs sm:text-sm text-graphite font-light">
                        <span className="text-rose font-mono text-xs mt-0.5">&bull;</span>
                        <span>{deliv}</span>
                      </div>
                    </HoverReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Rule */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 flex items-center justify-between text-[11px] font-mono text-graphite-muted border-t border-graphite-hairline pt-4">
            <span>SCROLLTRIGGER PINNED METHODOLOGY</span>
            <span>AVORRIA ENGINEERING SPECIFICATION</span>
          </div>
        </section>
      )}

      {/* 5. VERIFIED TOOLCHAINS (TYPED LIST, NO LOGO SOUP) */}
      {service.techStackCategorized && (
        <section className="w-full border-b border-graphite-hairline py-20 px-6 sm:px-8 lg:px-12 bg-ivory">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-rose block">
                Engineering Stack &middot; Explicit Rationale
              </span>
              <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
                Verified Toolchains &amp; Runtimes
              </h2>
              <p className="text-sm sm:text-base font-light text-graphite-muted leading-relaxed">
                We select tools based on mathematical necessity, zero-runtime compilation, and verifiable Core Web Vitals impact. We strictly prohibit marketing logo grids; below is the concrete technical justification for every runtime dependency we maintain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.techStackCategorized.map((cat) => (
                <div
                  key={cat.category}
                  className="border border-graphite-hairline p-8 bg-ivory-subtle space-y-6"
                >
                  <h3 className="text-xs font-mono uppercase tracking-wider text-rose border-b border-graphite-hairline pb-3">
                    {cat.category}
                  </h3>

                  <div className="space-y-4">
                    {cat.items.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <span className="text-xs font-mono text-graphite block">
                          {item.name}
                        </span>
                        <p className="text-[11px] text-graphite-muted font-light leading-relaxed">
                          {item.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. WHAT THE ENGAGEMENT LOOKS LIKE */}
      {service.engagementDetails && (
        <section className="w-full border-b border-graphite-hairline py-20 px-6 sm:px-8 lg:px-12 bg-ivory">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-rose block">
                Engagement Model &middot; SOW Structure
              </span>
              <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
                What the Engagement Looks Like
              </h2>
              <p className="text-sm sm:text-base font-light text-graphite-muted leading-relaxed">
                Avorria engages directly with corporate CTOs, VPs of Engineering, and Digital Directors. Every project is governed by strict mutual non-disclosure and fixed-scope deliverables.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Process & Commercials */}
              <div className="lg:col-span-8 border border-graphite-hairline p-8 sm:p-10 bg-ivory space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase text-rose tracking-wider block">
                    Execution Methodology
                  </span>
                  <h3 className="font-fluid-h3 font-extralight text-graphite">
                    Sprint Cadence &amp; Quality Gating
                  </h3>
                  <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
                    {service.engagementDetails.process}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-graphite-hairline">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-graphite-muted block">
                      Commercial Terms
                    </span>
                    <p className="text-xs text-graphite font-light leading-relaxed">
                      {service.engagementDetails.commercialModel}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-graphite-muted block">
                      Investment Baseline
                    </span>
                    <p className="text-xs text-graphite font-light leading-relaxed font-mono text-rose">
                      {service.pricingGuidance.range} ({service.pricingGuidance.currency})
                    </p>
                  </div>
                </div>

                {/* Timeline Range with Pete Currey Confirmation Status */}
                <div className="p-6 bg-ivory-subtle border border-graphite-hairline space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="uppercase text-graphite">Engagement Timeline Range</span>
                    <span className="text-rose font-light">{service.engagementDetails.timelineRange}</span>
                  </div>
                  <p className="text-[11px] text-graphite-muted font-light leading-relaxed">
                    {service.engagementDetails.timelineConfirmation}
                  </p>
                </div>
              </div>

              {/* Dedicated Team Composition */}
              <div className="lg:col-span-4 border border-graphite-hairline p-8 bg-ivory-subtle space-y-6">
                <div className="space-y-2 border-b border-graphite-hairline pb-4">
                  <span className="text-xs font-mono uppercase text-rose tracking-wider block">
                    Staffing Model
                  </span>
                  <h3 className="text-lg font-extralight text-graphite">
                    Assigned Technical Leadership
                  </h3>
                </div>

                <ul className="space-y-3 text-xs font-light text-graphite">
                  {service.engagementDetails.teamComposition.map((role) => (
                    <li key={role} className="flex items-start gap-2.5 pb-2 border-b border-graphite-hairline/60">
                      <span className="text-rose font-mono text-[11px] mt-0.5">&bull;</span>
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[11px] font-mono text-graphite-muted leading-relaxed">
                  All architects are full-time Avorria partners based in London or New York. No subcontracting or offshore offshore outsourcing.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. RELATED CASE STUDIES (FROM CONTENT LAYER) */}
      {relatedCaseStudies.length > 0 && (
        <section className="w-full border-b border-graphite-hairline py-20 px-6 sm:px-8 lg:px-12 bg-ivory">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-graphite-hairline pb-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-rose block">
                  Empirical Proof
                </span>
                <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
                  Related Mandates &amp; Case Studies
                </h2>
              </div>
              <Link
                href={`${prefix}/case-studies`}
                className="text-xs font-mono uppercase tracking-widest text-rose hover:text-graphite underline-sweep"
              >
                View all case studies &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedCaseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="border border-graphite-hairline p-8 bg-ivory space-y-6 hover:border-graphite transition-colors duration-200"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
                    <span className="text-rose">{cs.jurisdiction}</span>
                    <span>[{cs.clientSector}]</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-fluid-h3 font-extralight text-graphite">
                      <Link href={`${prefix}/case-studies/${cs.slug}`} className="hover:text-rose transition-colors">
                        {cs.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
                      {cs.challenge}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-graphite-hairline">
                    <span className="text-[11px] font-mono text-graphite-muted uppercase tracking-wider block">
                      Empirical Metric Verified:
                    </span>
                    <p className="text-xs font-mono text-graphite font-light">
                      &bull; {cs.metrics[0]}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`${prefix}/case-studies/${cs.slug}`}
                      className="text-xs font-mono text-rose hover:underline"
                    >
                      Read Case Study Analysis &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. RELATED LOBBY ARTICLES */}
      {relatedLobbyArticles.length > 0 && (
        <section className="w-full border-b border-graphite-hairline py-20 px-6 sm:px-8 lg:px-12 bg-ivory-subtle/50">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-graphite-hairline pb-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-rose block">
                  The Lobby Research
                </span>
                <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
                  Architectural Essays &amp; Standards
                </h2>
              </div>
              <Link
                href="/lobby"
                className="text-xs font-mono uppercase tracking-widest text-rose hover:text-graphite underline-sweep"
              >
                Access The Lobby &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedLobbyArticles.map((article) => (
                <article
                  key={article.slug}
                  className="border border-graphite-hairline p-8 bg-ivory space-y-4 hover:border-graphite transition-colors duration-200"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
                    <span>Published: {article.publishedAt}</span>
                    <span className="text-rose">{article.readingTimeMinutes} min read</span>
                  </div>

                  <h3 className="font-fluid-h3 font-extralight text-graphite">
                    <Link href={`/lobby/${article.slug}`} className="hover:text-rose transition-colors">
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/lobby/${article.slug}`}
                      className="text-xs font-mono text-rose hover:underline"
                    >
                      Read Full Architectural Essay &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. DIRECT MANDATE INITIATION CTA */}
      <section className="w-full py-24 px-6 sm:px-8 lg:px-12 bg-ivory">
        <div className="max-w-7xl mx-auto border border-graphite-hairline p-8 sm:p-14 bg-ivory-subtle space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-rose block">
              Mandate Transmission
            </span>
            <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
              Initiate an Engineering Mandate for {service.title}
            </h2>
            <p className="font-fluid-body text-graphite-muted leading-relaxed font-light">
              Direct consultation with partner leadership in London and New York. All preliminary discussions are governed by mutual non-disclosure before code examination.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6">
            <Button href={`${prefix}/contact`} variant="primary" magnetic>
              Inquire regarding {service.code} &rarr;
            </Button>
            <Button href={`${prefix}/services`} variant="secondary">
              Review all service specifications
            </Button>
          </div>

          <div className="pt-8 border-t border-graphite-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-graphite-muted">
            <span>
              {isUs
                ? "Direct US Line: +1 212 555 0184 · newyork@avorria.com"
                : "Direct UK Line: +44 20 7946 0192 · london@avorria.com"}
            </span>
            <span>Commercial Governance: Fixed-Milestone SOW</span>
          </div>
        </div>
      </section>
    </article>
  );
}
