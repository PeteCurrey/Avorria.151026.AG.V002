"use client";

import React from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/content/data/case-studies";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SelectedWorkSection() {
  return (
    <section id="selected-work" className="w-full bg-midnight border-b border-white/10">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-32 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10">
        <SectionHeader
          eyebrow="05 / Selected Mandates"
          heading="Enterprise Proof &amp; Case Studies"
          lead="Every engagement is executed under rigorous non-disclosure agreements. Below is verified architectural proof from enterprise deployments in London and New York."
        />
        <div className="flex items-center gap-4 text-xs font-mono text-graphite-muted shrink-0">
          <span>Horizontal Scrub</span>
          <span className="text-cobalt">&rarr;</span>
        </div>
      </div>

      {/* Horizontal Pinned Scroll Track */}
      <HorizontalScroll className="bg-midnight py-12 lg:py-16">
        {/* Render Available Case Studies */}
        {CASE_STUDIES.map((study, idx) => (
          <div
            key={study.id}
            className="w-[88vw] sm:w-[560px] lg:w-[640px] shrink-0 border border-white/10 bg-midnight-card/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-6 group hover:border-cobalt/50 transition-all duration-300 shadow-2xl"
          >
            {/* Meta Header */}
            <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-white/10 pb-4">
              <span className="text-cobalt font-medium">0{idx + 1} / MANDATE</span>
              <span>{study.jurisdiction} [{study.clientSector}]</span>
            </div>

            {/* Parallax Image / Architectural Visual Slot */}
            <div className="h-[220px] sm:h-[260px] border border-white/10 rounded-xl overflow-hidden relative bg-midnight-surface">
              <ParallaxImage
                className="w-full h-full"
                speed={0.2}
              >
                <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-midnight-surface via-midnight-card to-midnight text-white">
                  <div className="flex items-center justify-between text-xs font-mono text-cobalt">
                    <span className="px-2 py-0.5 rounded-full bg-cobalt/10 border border-cobalt/20 text-[11px]">{study.status}</span>
                    <span className="text-graphite-muted">ARCHITECTURAL SCHEMATIC</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-graphite-muted uppercase tracking-wider block">
                      Targeted Core Web Vitals
                    </span>
                    <p className="font-mono text-sm sm:text-base text-white font-light">
                      {study.metrics?.[0] || study.summary}
                    </p>
                  </div>
                </div>
              </ParallaxImage>
            </div>

            {/* Title & Summary */}
            <div className="space-y-3">
              <h3 className="font-fluid-h3 font-extralight text-white group-hover:text-cobalt transition-colors duration-200">
                <Link href={`/work/${study.slug}`}>
                  {study.title}
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed font-light">
                {study.challenge}
              </p>
            </div>

            {/* Metrics List */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[11px] font-mono text-graphite-muted uppercase tracking-wider block">
                Verified Architectural Deliverables:
              </span>
              <ul className="space-y-1.5 text-xs text-graphite font-light">
                {(study.metrics || []).map((metric, mIdx) => (
                  <li key={mIdx} className="flex items-start gap-2">
                    <span className="text-cobalt font-mono text-[11px] mt-0.5">&bull;</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Link */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-graphite-muted text-[11px]">Strict NDA Governance</span>
              <Link
                href={`/work/${study.slug}`}
                className="text-cobalt group-hover:text-white hover:underline transition-colors flex items-center gap-1.5"
              >
                <span>Read Architectural Case Study</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ))}

        {/* Content Slot 3: Clearly marked content slot when < 3 case studies */}
        <div className="w-[88vw] sm:w-[560px] lg:w-[640px] shrink-0 border border-white/10 border-dashed bg-midnight-card/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-white/10 pb-4">
              <span className="text-cobalt font-medium">03 / ACTIVE MANDATE</span>
              <span className="uppercase text-[11px] bg-cobalt/10 border border-cobalt/30 text-cobalt px-2.5 py-0.5 rounded-full">
                In Calibration
              </span>
            </div>

            <div className="h-[220px] sm:h-[260px] border border-white/10 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-midnight space-y-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cobalt animate-ping inline-block" />
              <span className="font-mono text-xs text-white uppercase tracking-widest">
                [CONTENT SLOT 03 &middot; ACTIVE WORK]
              </span>
              <p className="text-xs text-graphite-muted max-w-sm font-light leading-relaxed">
                Transatlantic asset management infrastructure refactoring. Telemetry validation and security audit currently underway under mutual non-disclosure.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-fluid-h3 font-extralight text-white">
                Transatlantic Infrastructure Modernisation
              </h3>
              <p className="text-xs sm:text-sm text-graphite-muted leading-relaxed font-light">
                Enterprise migration of legacy monolithic client portals into decoupled Next.js 16 architectures with real-time portfolio streaming and sub-second LCP SLAs.
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs font-light text-graphite-muted">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span>Contractual SLA Target:</span>
                <span className="text-cobalt font-medium">Mobile LCP &lt; 1.8s</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span>Jurisdiction:</span>
                <span className="text-white">London &middot; New York</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span>Scheduled Production Release:</span>
                <span className="text-white">Q3 2026</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-graphite-muted">
            <span>Slot Reserved</span>
            <span className="text-[11px] text-cobalt">[NDA PROTECTED]</span>
          </div>
        </div>
      </HorizontalScroll>
    </section>
  );
}
