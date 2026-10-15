"use client";

import React from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/content/data/case-studies";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SelectedWorkSection() {
  return (
    <section id="selected-work" className="w-full bg-ivory border-b border-graphite-hairline">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-32 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-graphite-hairline">
        <SectionHeader
          eyebrow="05 / Selected Mandates"
          heading="Enterprise Proof &amp; Case Studies"
          lead="Every engagement is executed under rigorous non-disclosure agreements. Below is verified architectural proof from enterprise deployments in London and New York."
        />
        <div className="flex items-center gap-4 text-xs font-mono text-graphite-muted shrink-0">
          <span>Horizontal Scrub</span>
          <span className="text-rose">&rarr;</span>
        </div>
      </div>

      {/* Horizontal Pinned Scroll Track */}
      <HorizontalScroll className="bg-ivory py-12 lg:py-16">
        {/* Render Available Case Studies */}
        {CASE_STUDIES.map((study, idx) => (
          <div
            key={study.id}
            className="w-[88vw] sm:w-[560px] lg:w-[640px] shrink-0 border border-graphite-hairline bg-ivory p-6 sm:p-8 space-y-6 group hover:border-graphite transition-all duration-300"
          >
            {/* Meta Header */}
            <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-4">
              <span className="text-rose font-light">0{idx + 1} / MANDATE</span>
              <span>{study.jurisdiction} [{study.clientSector}]</span>
            </div>

            {/* Parallax Image / Architectural Visual Slot */}
            <div className="h-[220px] sm:h-[260px] border border-graphite-hairline overflow-hidden relative bg-graphite">
              <ParallaxImage
                className="w-full h-full"
                speed={0.2}
              >
                <div className="w-full h-full flex flex-col justify-between p-6 bg-graphite text-ivory">
                  <div className="flex items-center justify-between text-xs font-mono text-rose">
                    <span>{study.status}</span>
                    <span>ARCHITECTURAL SCHEMATIC</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-graphite-muted uppercase tracking-wider block">
                      Targeted Core Web Vitals
                    </span>
                    <p className="font-mono text-sm sm:text-base text-ivory font-light">
                      {study.metrics[0]}
                    </p>
                  </div>
                </div>
              </ParallaxImage>
            </div>

            {/* Title & Summary */}
            <div className="space-y-3">
              <h3 className="font-fluid-h3 font-extralight text-graphite group-hover:text-rose transition-colors duration-200">
                <Link href={`/case-studies/${study.slug}`}>
                  {study.title}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed font-light">
                {study.challenge}
              </p>
            </div>

            {/* Metrics List */}
            <div className="space-y-2 pt-2 border-t border-graphite-hairline">
              <span className="text-[11px] font-mono text-graphite-muted uppercase tracking-wider block">
                Verified Architectural Deliverables:
              </span>
              <ul className="space-y-1.5 text-xs text-graphite font-light">
                {study.metrics.map((metric, mIdx) => (
                  <li key={mIdx} className="flex items-start gap-2">
                    <span className="text-rose font-mono text-[11px] mt-0.5">&bull;</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Link */}
            <div className="pt-3 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
              <span className="text-graphite-muted text-[11px]">Strict NDA Governance</span>
              <Link
                href={`/case-studies/${study.slug}`}
                className="text-rose group-hover:text-graphite hover:underline transition-colors flex items-center gap-1.5"
              >
                <span>Read Architectural Case Study</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ))}

        {/* Content Slot 3: Clearly marked content slot when < 3 case studies */}
        <div className="w-[88vw] sm:w-[560px] lg:w-[640px] shrink-0 border border-graphite-hairline border-dashed bg-ivory-subtle/70 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-4">
              <span className="text-rose font-light">03 / ACTIVE MANDATE</span>
              <span className="uppercase text-[11px] bg-rose-subtle px-2 py-0.5 text-rose">
                In Calibration
              </span>
            </div>

            <div className="h-[220px] sm:h-[260px] border border-graphite-hairline flex flex-col items-center justify-center p-8 text-center bg-ivory space-y-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose animate-ping inline-block" />
              <span className="font-mono text-xs text-graphite uppercase tracking-widest">
                [CONTENT SLOT 03 &middot; ACTIVE WORK]
              </span>
              <p className="text-xs text-graphite-muted max-w-sm font-light leading-relaxed">
                Transatlantic asset management infrastructure refactoring. Telemetry validation and security audit currently underway under mutual non-disclosure.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-fluid-h3 font-extralight text-graphite">
                Transatlantic Infrastructure Modernisation
              </h3>
              <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed font-light">
                Enterprise migration of legacy monolithic client portals into decoupled Next.js 16 architectures with real-time portfolio streaming and sub-second LCP SLAs.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-graphite-hairline text-xs font-light text-graphite-muted">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span>Contractual SLA Target:</span>
                <span className="text-rose">Mobile LCP &lt; 1.8s</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span>Jurisdiction:</span>
                <span>London &middot; New York</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span>Scheduled Production Release:</span>
                <span>Q3 2026</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono text-graphite-muted">
            <span>Slot Reserved</span>
            <span className="text-[11px]">[NDA PROTECTED]</span>
          </div>
        </div>
      </HorizontalScroll>
    </section>
  );
}
