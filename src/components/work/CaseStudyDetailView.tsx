"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/content/schema";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudyDetailViewProps {
  caseStudy: CaseStudy;
  nextCaseStudy?: CaseStudy;
  locale?: "en-GB" | "en-US";
}

export function CaseStudyDetailView({
  caseStudy,
  nextCaseStudy,
  locale = "en-GB",
}: CaseStudyDetailViewProps) {
  const isUs = locale === "en-US";
  const pathPrefix = isUs ? "/us" : "";
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLElement>(null);

  // Parallax scrub on hero and next-case-study reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero architectural grid parallax scrub
      if (heroRef.current && parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          y: 120,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Next case study pinned scrub transition
      if (nextSectionRef.current) {
        const nextTitle = nextSectionRef.current.querySelector(".next-case-title");
        const nextOverlay = nextSectionRef.current.querySelector(".next-case-curtain");

        if (nextTitle && nextOverlay) {
          gsap.fromTo(
            nextOverlay,
            { scaleY: 1 },
            {
              scaleY: 0,
              transformOrigin: "bottom",
              ease: "none",
              scrollTrigger: {
                trigger: nextSectionRef.current,
                start: "top 80%",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            nextTitle,
            { y: 40, opacity: 0.6 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: nextSectionRef.current,
                start: "top 70%",
                end: "center center",
                scrub: true,
              },
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  const alternateLocaleHref = isUs
    ? `/work/${caseStudy.slug}`
    : `/us/work/${caseStudy.slug}`;

  // Filter only verified metrics (unverified metrics MUST NOT render)
  const verifiedMetrics = caseStudy.performanceMetrics?.filter((m) => m.verified) || [];

  return (
    <article className="w-full bg-ivory text-graphite overflow-hidden">
      {/* 1. HERO WITH SCRUBBED PARALLAX */}
      <header
        ref={heroRef}
        className="relative min-h-[75vh] flex flex-col justify-between border-b border-graphite-hairline pt-32 pb-16 px-6 sm:px-8 lg:px-12 bg-ivory"
      >
        {/* Architectural background parallax coordinate grid */}
        <div
          ref={parallaxRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30 select-none overflow-hidden"
        >
          <div className="absolute right-6 top-24 w-[36rem] h-[36rem] border border-graphite-hairline rotate-12 transition-transform">
            <div className="absolute inset-8 border border-graphite-hairline/60 rotate-6" />
            <div className="absolute inset-16 border border-rose/30" />
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-graphite-muted">
              COORDINATES // 51.5074° N, 0.1278° W &middot; 40.7128° N, 74.0060° W
            </div>
          </div>
        </div>

        {/* Top Breadcrumb & Metadata Controls */}
        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono border-b border-graphite-hairline/60 pb-4 text-graphite-muted">
            <div className="flex items-center gap-2">
              <Link href={`${pathPrefix}/work`} className="hover:text-rose transition-colors">
                &larr; Work
              </Link>
              <span>/</span>
              <span className="text-graphite">{caseStudy.serviceCategory}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-2 py-0.5 border border-graphite-hairline text-[11px]">
                Market: {caseStudy.market}
              </span>
              <Link
                href={alternateLocaleHref}
                className="text-graphite hover:text-rose underline transition-colors"
              >
                {isUs ? "Switch to UK Specification &rarr;" : "Switch to US Specification &rarr;"}
              </Link>
            </div>
          </div>

          {/* Verification Badge & Title */}
          <div className="space-y-4 max-w-5xl">
            <div className="flex items-center gap-3">
              {caseStudy.verified ? (
                <span className="text-xs font-mono uppercase tracking-widest text-rose px-2.5 py-1 border border-rose bg-rose/5">
                  &bull; Verified Public Architecture
                </span>
              ) : (
                <span className="text-xs font-mono uppercase tracking-widest text-graphite-muted px-2.5 py-1 border border-graphite-hairline">
                  Confidential Engagement / Under NDA
                </span>
              )}
              <span className="text-xs font-mono text-graphite-muted">
                Client: {caseStudy.clientName}
              </span>
            </div>

            <h1 className="font-fluid-display font-extralight text-graphite tracking-tighter-display">
              {caseStudy.title}
            </h1>

            <p className="font-fluid-body text-graphite-muted leading-relaxed font-light max-w-4xl">
              {caseStudy.summary}
            </p>
          </div>

          {/* Quick Specifications Bar */}
          <div className="pt-6 border-t border-graphite-hairline flex flex-wrap gap-8 text-xs font-mono text-graphite">
            <div>
              <span className="text-graphite-muted block uppercase text-[10px] tracking-wider mb-0.5">
                Client Sector
              </span>
              <span className="text-sm font-light text-graphite">{caseStudy.clientSector}</span>
            </div>
            <div>
              <span className="text-graphite-muted block uppercase text-[10px] tracking-wider mb-0.5">
                Deployment Status
              </span>
              <span className="text-sm font-light text-rose">{caseStudy.status}</span>
            </div>
            <div>
              <span className="text-graphite-muted block uppercase text-[10px] tracking-wider mb-0.5">
                Published &middot; Verified
              </span>
              <span className="text-sm font-light text-graphite">
                {caseStudy.publishedAt} (Reviewed {caseStudy.updatedAt})
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. THREE-PART NARRATIVE: CHALLENGE / APPROACH / OUTCOME */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 border-b border-graphite-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Challenge */}
          <div className="space-y-4 lg:border-r lg:border-graphite-hairline lg:pr-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose">01</span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-graphite">
                The Challenge
              </h2>
            </div>
            <p className="text-sm sm:text-base font-light text-graphite-muted leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Approach */}
          <div className="space-y-4 lg:border-r lg:border-graphite-hairline lg:pr-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose">02</span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-graphite">
                The Architectural Approach
              </h2>
            </div>
            <p className="text-sm sm:text-base font-light text-graphite-muted leading-relaxed">
              {caseStudy.approach}
            </p>
          </div>

          {/* Outcome */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose">03</span>
              <h2 className="text-xs font-mono uppercase tracking-widest text-graphite">
                The Operational Outcome
              </h2>
            </div>
            <p className="text-sm sm:text-base font-light text-graphite-muted leading-relaxed">
              {caseStudy.outcome}
            </p>
          </div>
        </div>
      </section>

      {/* 3. PERFORMANCE BLOCK (REAL VERIFIED-ONLY METRICS) */}
      <section className="w-full bg-ivory-subtle/70 border-b border-graphite-hairline py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-graphite-hairline pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-rose block">
                Empirical Telemetry
              </span>
              <h2 className="font-fluid-h2 font-extralight text-graphite tracking-tight-display">
                Performance &amp; SLA Benchmarks
              </h2>
            </div>
            <div className="text-xs font-mono text-graphite-muted text-right">
              <span>Standard: Chrome User Experience (CrUX)</span>
              <span className="block text-rose text-[11px]">
                Strict Rule: 100% verified production metrics only
              </span>
            </div>
          </div>

          {verifiedMetrics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verifiedMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="border border-graphite-hairline p-6 bg-ivory space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline/60 pb-2">
                    <span className="truncate">{m.label}</span>
                    {m.delta && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-rose/10 text-rose font-mono">
                        {m.delta}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-mono text-graphite-muted/70 line-through">
                        Before: {m.before}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extralight font-mono text-rose">
                        {m.after}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-graphite-muted leading-normal pt-2 border-t border-graphite-hairline/60">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-graphite-hairline p-10 bg-ivory text-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-graphite-muted block">
                Confidential Performance Ledger
              </span>
              <p className="text-sm font-light text-graphite-muted max-w-xl mx-auto">
                In compliance with strict mutual non-disclosure agreements, quantitative production telemetry for this engagement is restricted to verified commercial stakeholders.
              </p>
            </div>
          )}

          {/* Verification Footnote */}
          {verifiedMetrics.length > 0 && (
            <div className="flex items-center gap-3 text-xs font-mono text-graphite-muted pt-4 border-t border-graphite-hairline/60">
              <span className="text-rose text-base leading-none">&bull;</span>
              <span>
                Verified against production infrastructure by Pete Currey &middot; Avorria Technical Architecture.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 4. TECHNOLOGY USED & CREDITS */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 border-b border-graphite-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Tech Used */}
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-graphite-muted block">
              04 // Engineering Stack
            </span>
            <h2 className="text-xl font-extralight text-graphite">
              Technologies &amp; Architecture Layers
            </h2>
            <div className="flex flex-wrap gap-2.5 pt-2">
              {caseStudy.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-mono bg-ivory-subtle text-graphite border border-graphite-hairline"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Credits */}
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-graphite-muted block">
              05 // Attribution &amp; Team
            </span>
            <h2 className="text-xl font-extralight text-graphite">
              Project Leadership &amp; Contributors
            </h2>
            <div className="space-y-4 pt-2">
              {caseStudy.credits.map((credit, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-graphite-hairline/60 pb-3 text-xs font-mono"
                >
                  <div>
                    <span className="text-graphite font-light block text-sm">
                      {credit.name}
                    </span>
                    <span className="text-graphite-muted text-[11px]">
                      {credit.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-rose">
                    [{credit.affiliation}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEXT-CASE-STUDY SCROLL TRANSITION */}
      {nextCaseStudy && (
        <section
          ref={nextSectionRef}
          className="relative w-full border-b border-graphite-hairline bg-graphite text-ivory py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
        >
          {/* Animated curtain element */}
          <div
            className="next-case-curtain absolute inset-0 bg-graphite-muted/20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-rose">
              Next Architecture &rarr;
            </span>

            <div className="next-case-title space-y-4 w-full">
              <Link
                href={`${pathPrefix}/work/${nextCaseStudy.slug}`}
                className="group block space-y-3"
              >
                <span className="text-xs font-mono text-ivory/60 block">
                  [{nextCaseStudy.serviceCategory}] &middot; {nextCaseStudy.clientSector}
                </span>
                <h3 className="font-fluid-display font-extralight text-ivory group-hover:text-rose transition-colors duration-200">
                  {nextCaseStudy.title} &rarr;
                </h3>
                <p className="font-fluid-body text-ivory/70 font-light max-w-3xl leading-relaxed">
                  {nextCaseStudy.summary}
                </p>
              </Link>
            </div>

            <div className="pt-8 border-t border-ivory/20 w-full flex items-center justify-between text-xs font-mono text-ivory/60">
              <Link href={`${pathPrefix}/work`} className="hover:text-rose transition-colors">
                &larr; Return to All Selected Work
              </Link>
              <span>Avorria Engineering Repository</span>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
