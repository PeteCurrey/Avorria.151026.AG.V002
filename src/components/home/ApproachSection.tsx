"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/SectionHeader";

const APPROACH_STEPS = [
  {
    num: "01",
    phase: "Phase 01 / Architecture",
    title: "Formal Schema & SLA Specification",
    headline: "Deterministic contracts before code generation.",
    body: "Before writing any visual components, every data contract, state transition, and API boundary is locked in strict TypeScript and Zod schemas. We bind contractual Core Web Vitals thresholds directly into commercial statements of work.",
    deliverables: [
      "Zod schema validation at build and runtime",
      "Contractual Core Web Vitals SLA (Mobile LCP < 2.0s)",
      "Strict WCAG 2.2 Level AA accessibility baseline",
    ],
  },
  {
    num: "02",
    phase: "Phase 02 / Engineering",
    title: "Decoupled High-Velocity Build",
    headline: "Zero-hydration islands and edge execution.",
    body: "We engineer with Next.js App Router, React 19 Server Components, and granular Vite modules. All animations are strictly confined to transform and opacity on compositor layers, ensuring 60fps responsiveness without main thread blocking.",
    deliverables: [
      "React 19 Server Components with zero hydration overhead",
      "Strict initial bundle budget (< 80KB critical path JS)",
      "Lenis and GSAP interaction system synced to ScrollTrigger",
    ],
  },
  {
    num: "03",
    phase: "Phase 03 / Hardening",
    title: "Continuous Automated SLA Gates",
    headline: "Empirical verification before production deployment.",
    body: "Every pull request must pass our automated quality gates: static accessibility audits, build-time schema enforcement, and dual-jurisdiction privacy checks. We monitor active sessions via empirical PerformanceObserver telemetry.",
    deliverables: [
      "Automated CI quality gate blocking non-compliant builds",
      "Zero tracking cookies and privacy-first edge routing",
      "Continuous RUM telemetry and transatlantic synchronisation",
    ],
  },
];

export function ApproachSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced || !containerRef.current) return;

    const element = containerRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          const step = Math.min(2, Math.floor(p * 3));
          setActiveStep(step);
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, []);

  if (isReducedMotion) {
    return (
      <section className="py-24 bg-midnight text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
          <SectionHeader
            eyebrow="06 / The Methodology"
            heading="Engineering Approach"
            lead="Our three-phase architecture methodology delivers verifiable performance without compromise."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {APPROACH_STEPS.map((step) => (
              <div
                key={step.num}
                className="border border-white/10 p-8 space-y-6 bg-midnight-card/80 rounded-2xl backdrop-blur-md"
              >
                <span className="font-extralight text-6xl text-white/20 font-mono">
                  {step.num}
                </span>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-cobalt uppercase tracking-wider block">
                    {step.phase}
                  </span>
                  <h3 className="text-2xl font-extralight text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-graphite-muted leading-relaxed font-light">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const current = APPROACH_STEPS[activeStep];

  return (
    <section
      ref={containerRef}
      id="approach"
      className="relative w-full min-h-screen bg-midnight text-white flex flex-col justify-between overflow-hidden border-b border-white/10"
      aria-label="Avorria Engineering Approach"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 flex items-center justify-between z-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cobalt block mb-1">
            06 / The Methodology
          </span>
          <h2 className="font-fluid-h2 font-extralight text-white tracking-tight-display">
            The Architectural Approach
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-graphite-muted">
          <span>Pinned Step: {activeStep + 1} of 3</span>
          <div className="w-24 h-[1px] bg-white/10 relative">
            <div
              className="absolute top-0 left-0 h-full bg-cobalt transition-all duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Center Interactive Scrubbed Stage */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 py-12">
        {/* Left: Giant Numeral & Step Navigation */}
        <div className="lg:col-span-5 space-y-8">
          <div className="relative">
            <span className="font-extralight text-[6rem] sm:text-[9rem] lg:text-[11rem] leading-none text-white/30 tracking-tighter block select-none">
              {current.num}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-cobalt block -mt-4 pl-2 font-medium">
              {current.phase}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {APPROACH_STEPS.map((s, idx) => (
              <div
                key={s.num}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeStep === idx
                    ? "w-16 bg-cobalt"
                    : "w-8 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Architectural Content Panel */}
        <div className="lg:col-span-7 border border-white/10 bg-midnight-card/90 backdrop-blur-xl p-8 sm:p-12 space-y-6 shadow-2xl rounded-2xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-cobalt tracking-wider block font-medium">
              {current.headline}
            </span>
            <h3 className="font-fluid-h2 font-extralight text-white tracking-tight-display">
              {current.title}
            </h3>
          </div>

          <p className="text-sm sm:text-base font-light text-graphite-muted leading-relaxed">
            {current.body}
          </p>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <span className="text-xs font-mono text-white uppercase tracking-wider block">
              Verifiable Outputs:
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-graphite font-light">
              {current.deliverables.map((del, dIdx) => (
                <li key={dIdx} className="flex items-start gap-2.5">
                  <span className="text-cobalt font-mono text-xs mt-0.5">&bull;</span>
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Rule */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 flex items-center justify-between text-[11px] font-mono text-graphite-muted z-10 border-t border-white/10 pt-4">
        <span>SCROLL-SCRUBBED METHODOLOGY SEQUENCE</span>
        <span className="text-cobalt">AVORRIA GOVERNANCE SPECIFICATION</span>
      </div>
    </section>
  );
}
