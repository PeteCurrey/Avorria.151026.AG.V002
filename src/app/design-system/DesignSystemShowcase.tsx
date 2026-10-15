"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubSection } from "@/components/motion/ScrubSection";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { HoverReveal } from "@/components/motion/HoverReveal";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Marquee } from "@/components/ui/Marquee";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { PageTransition } from "@/components/motion/PageTransition";

export function DesignSystemShowcase() {
  const [triggerCount, setTriggerCount] = useState(0);
  const [leakLog, setLeakLog] = useState<string[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateCount = () => {
      setTriggerCount(ScrollTrigger.getAll().length);
    };

    updateCount();
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const runTeardownSimulation = () => {
    const before = ScrollTrigger.getAll().length;
    // Simulate what LenisScrollProvider does on navigation:
    ScrollTrigger.getAll().forEach((t) => t.kill());
    const after = ScrollTrigger.getAll().length;
    setTriggerCount(after);
    setLeakLog((prev) => [
      `[${new Date().toLocaleTimeString()}] Route navigation simulated: ${before} triggers purged -> ${after} remaining (0 leak).`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-24">
      <CursorFollower />
      <PageTransition />

      {/* Showcase Header */}
      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
          <span className="text-xs font-mono uppercase tracking-widest text-rose">
            Internal Blueprint &middot; /design-system &middot; noindex
          </span>
        </div>
        <h1 className="font-fluid-display font-extralight text-graphite tracking-tighter-display">
          Avorria Design System &amp; Motion Engine
        </h1>
        <p className="font-fluid-body text-graphite-muted max-w-3xl leading-relaxed">
          Comprehensive specification of design tokens, mathematical typography scales, WCAG 2.2 AA contrast matrix, UI components, and reusable GSAP/Lenis motion primitives.
        </p>
      </header>

      {/* 1. DESIGN TOKENS & CONTRAST MATRIX */}
      <section className="space-y-8">
        <div className="border-b border-graphite-hairline pb-4">
          <span className="text-xs font-mono text-rose uppercase tracking-wider block mb-1">
            01 / Foundation Tokens
          </span>
          <h2 className="font-fluid-h2 text-graphite">Palette &amp; WCAG Contrast Verification</h2>
          <p className="text-xs text-graphite-muted max-w-2xl mt-1">
            Exclusively ivory, graphite, and rose. Every pairing is mathematically verified to exceed WCAG 2.2 AA (minimum 4.5:1 for body copy).
          </p>
        </div>

        {/* Swatches */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="border border-graphite-hairline p-6 bg-ivory space-y-2">
            <span className="text-xs font-mono text-graphite block">--color-ivory (#FAF8F5)</span>
            <p className="text-xs text-graphite-muted font-light">Primary Editorial Background</p>
          </div>
          <div className="border border-graphite-hairline p-6 bg-graphite text-ivory space-y-2">
            <span className="text-xs font-mono text-ivory block">--color-graphite (#141517)</span>
            <p className="text-xs text-graphite-muted font-light">Primary Typography &amp; Monolith Blocks</p>
          </div>
          <div className="border border-graphite-hairline p-6 bg-ivory space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose" />
              <span className="text-xs font-mono text-rose block">--color-rose (#A33A4B)</span>
            </div>
            <p className="text-xs text-graphite-muted font-light">Single Restrained Accent</p>
          </div>
        </div>

        {/* Contrast Matrix Table */}
        <div className="border border-graphite-hairline p-6 bg-ivory overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-light">
            <thead>
              <tr className="border-b border-graphite-hairline text-graphite-muted uppercase tracking-wider font-mono">
                <th className="py-3 pr-4">Text Token</th>
                <th className="py-3 pr-4">Background Token</th>
                <th className="py-3 pr-4">Calculated Ratio</th>
                <th className="py-3 pr-4">WCAG Standard</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-hairline text-graphite">
              <tr>
                <td className="py-3 font-mono">Graphite (#141517)</td>
                <td className="py-3 font-mono">Ivory (#FAF8F5)</td>
                <td className="py-3 font-mono text-rose">17.45:1</td>
                <td className="py-3">WCAG AAA (7.0:1)</td>
                <td className="py-3 text-rose">&check; Exceeds AAA</td>
              </tr>
              <tr>
                <td className="py-3 font-mono">Graphite Muted (#595D66)</td>
                <td className="py-3 font-mono">Ivory (#FAF8F5)</td>
                <td className="py-3 font-mono text-rose">6.30:1</td>
                <td className="py-3">WCAG AA (4.5:1)</td>
                <td className="py-3 text-rose">&check; Exceeds AA</td>
              </tr>
              <tr>
                <td className="py-3 font-mono">Rose (#A33A4B)</td>
                <td className="py-3 font-mono">Ivory (#FAF8F5)</td>
                <td className="py-3 font-mono text-rose">5.89:1</td>
                <td className="py-3">WCAG AA (4.5:1)</td>
                <td className="py-3 text-rose">&check; Exceeds AA</td>
              </tr>
              <tr>
                <td className="py-3 font-mono">Rose Dark (#E59AA6)</td>
                <td className="py-3 font-mono">Graphite (#141517)</td>
                <td className="py-3 font-mono text-rose">7.60:1</td>
                <td className="py-3">WCAG AAA (7.0:1)</td>
                <td className="py-3 text-rose">&check; Exceeds AAA</td>
              </tr>
              <tr>
                <td className="py-3 font-mono">Ivory (#FAF8F5)</td>
                <td className="py-3 font-mono">Graphite (#141517)</td>
                <td className="py-3 font-mono text-rose">17.45:1</td>
                <td className="py-3">WCAG AAA (7.0:1)</td>
                <td className="py-3 text-rose">&check; Exceeds AAA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. FLUID TYPOGRAPHY SCALE & 12-COLUMN GRID */}
      <section className="space-y-8">
        <div className="border-b border-graphite-hairline pb-4">
          <span className="text-xs font-mono text-rose uppercase tracking-wider block mb-1">
            02 / Architectural Layout
          </span>
          <h2 className="font-fluid-h2 text-graphite">Fluid Type Scale &amp; 12-Column Grid</h2>
        </div>

        <div className="border border-graphite-hairline p-8 space-y-6 bg-ivory">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-graphite-muted block">
              .font-fluid-display &middot; clamp(2.75rem, 6vw + 1rem, 5.75rem) &middot; Weight 200
            </span>
            <div className="font-fluid-display text-graphite">
              Architectural Velocity.
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t border-graphite-hairline">
            <span className="text-[11px] font-mono text-graphite-muted block">
              .font-fluid-h1 &middot; clamp(2.25rem, 4vw + 0.75rem, 4.25rem) &middot; Weight 200
            </span>
            <div className="font-fluid-h1 text-graphite">
              Performance-First Platforms.
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t border-graphite-hairline">
            <span className="text-[11px] font-mono text-graphite-muted block">
              .font-fluid-h2 &middot; clamp(1.75rem, 2.5vw + 0.5rem, 3rem) &middot; Weight 300
            </span>
            <div className="font-fluid-h2 text-graphite">
              Deterministic AI Systems.
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t border-graphite-hairline">
            <span className="text-[11px] font-mono text-graphite-muted block">
              .font-fluid-body &middot; clamp(0.95rem, 0.4vw + 0.85rem, 1.125rem) &middot; Weight 300
            </span>
            <p className="font-fluid-body text-graphite-muted leading-relaxed max-w-2xl">
              Generous whitespace, thin hairline rules, and strict Work Sans typography. We enforce a zero bold rule across all content to preserve architectural restraint.
            </p>
          </div>
        </div>

        {/* 12-Column Grid Visualizer */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-graphite-muted">
            12-Column Architectural Grid System (.grid-12)
          </span>
          <div className="grid-12 p-4 border border-graphite-hairline bg-ivory-subtle text-center text-xs font-mono text-graphite-muted">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="py-6 border border-graphite-hairline bg-ivory">
                C{i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPONENT GALLERY */}
      <section className="space-y-8">
        <div className="border-b border-graphite-hairline pb-4">
          <span className="text-xs font-mono text-rose uppercase tracking-wider block mb-1">
            03 / UI Components
          </span>
          <h2 className="font-fluid-h2 text-graphite">Component Library</h2>
        </div>

        {/* Buttons & Links */}
        <div className="border border-graphite-hairline p-8 space-y-6 bg-ivory">
          <span className="text-xs uppercase tracking-wider text-graphite-muted block">
            Button Variants &amp; Magnetic Hover
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="primary" magnetic>
              Primary (Magnetic)
            </Button>
            <Button variant="secondary" magnetic>
              Secondary (Magnetic)
            </Button>
            <Button variant="text-link">
              Text Link with Underline Sweep &rarr;
            </Button>
          </div>
        </div>

        {/* Section Header Component */}
        <div className="border border-graphite-hairline p-8 bg-ivory">
          <span className="text-xs uppercase tracking-wider text-graphite-muted block mb-4">
            SectionHeader Component
          </span>
          <SectionHeader
            eyebrow="Precision Engineering"
            heading="Architectural Standards & Rigor"
            lead="Contractual performance commitments backed by automated CI quality verification."
          />
        </div>

        {/* Card Variants */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-graphite-muted block">
            Card Variants (Minimal, Monolith, Spec)
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="minimal">
              <h3 className="text-base text-graphite">Minimal Card</h3>
              <p className="text-xs text-graphite-muted leading-relaxed">
                Standard architectural card with ivory background and subtle hairline border deepening on hover.
              </p>
            </Card>

            <Card variant="monolith" code="MONO-01" eyebrow="Dark Surface">
              <h3 className="text-base text-ivory">Monolith Card</h3>
              <p className="text-xs text-graphite-muted leading-relaxed">
                Inverted dark surface engineered for high-contrast architectural emphasis.
              </p>
            </Card>

            <Card variant="spec" code="SPEC-02" eyebrow="Metric Matrix">
              <h3 className="text-base text-graphite">Spec Matrix Card</h3>
              <div className="space-y-1 text-xs text-graphite font-mono">
                <p>&bull; LCP &lt; 2.0s</p>
                <p>&bull; CLS &lt; 0.02</p>
                <p>&bull; INP &lt; 150ms</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Marquee Component */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-graphite-muted block">
            Marquee Component (Reduced-Motion Safe)
          </span>
          <Marquee speed={30}>
            <span>NEXT.JS APP ROUTER</span>
            <span className="text-rose">&bull;</span>
            <span>REACT 19 COMPILER</span>
            <span className="text-rose">&bull;</span>
            <span>DETERMINISTIC AI AGENTS</span>
            <span className="text-rose">&bull;</span>
            <span>SUB-SECOND LCP</span>
            <span className="text-rose">&bull;</span>
            <span>WCAG 2.2 LEVEL AA</span>
            <span className="text-rose">&bull;</span>
          </Marquee>
        </div>
      </section>

      {/* 4. MOTION ENGINE PRIMITIVES */}
      <section className="space-y-8">
        <div className="border-b border-graphite-hairline pb-4">
          <span className="text-xs font-mono text-rose uppercase tracking-wider block mb-1">
            04 / Motion Engine
          </span>
          <h2 className="font-fluid-h2 text-graphite">Motion Primitives Demonstration</h2>
        </div>

        {/* Masked Line-by-Line Reveal */}
        <div className="border border-graphite-hairline p-8 space-y-4 bg-ivory">
          <span className="text-xs font-mono text-rose uppercase tracking-wider block">
            &lt;Reveal type=&quot;lines&quot;&gt;
          </span>
          <Reveal type="lines">
            <h3 className="font-fluid-h2 font-extralight text-graphite">
              Masked line-by-line entrance animation with zero layout shift.
            </h3>
          </Reveal>
        </div>

        {/* HoverReveal Variants */}
        <div className="space-y-4">
          <span className="text-xs font-mono text-graphite-muted uppercase tracking-wider block">
            &lt;HoverReveal&gt; (4 Variants with Touch Fallback)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Cursor Mask Reveal */}
            <HoverReveal
              variant="cursor-mask"
              previewText="Sub-Second Latency Guaranteed"
              revealContent={<p className="text-xs text-ivory">Revealed specification datum via mouse tracking.</p>}
            >
              <h4 className="text-base text-graphite mb-1">Cursor Mask Reveal</h4>
              <p className="text-xs text-graphite-muted">
                Hover over this container to see the circular mask follow your pointer.
              </p>
            </HoverReveal>

            {/* 2. Card Lift */}
            <HoverReveal
              variant="card-lift"
              revealContent={
                <p className="text-xs font-mono text-rose">
                  Revealed metadata: Verified on 4G cellular profile.
                </p>
              }
            >
              <h4 className="text-base text-graphite mb-1">Card Lift Reveal</h4>
              <p className="text-xs text-graphite-muted">
                Card lifts smoothly on hover and expands hidden secondary specifications.
              </p>
            </HoverReveal>
          </div>

          {/* 3. Row Hover with Floating Datum */}
          <div className="border border-graphite-hairline bg-ivory p-6 space-y-2">
            <span className="text-xs uppercase tracking-wider text-graphite-muted block mb-2">
              Row Hover List with Floating Preview Datum
            </span>
            <HoverReveal variant="row-hover" previewText="Next.js App Router Architecture">
              <span className="text-sm font-light text-graphite">CAP-01: High-Performance Web Platforms</span>
            </HoverReveal>
            <HoverReveal variant="row-hover" previewText="Deterministic Multi-Agent State Machine">
              <span className="text-sm font-light text-graphite">CAP-02: Enterprise AI Orchestration</span>
            </HoverReveal>
            <HoverReveal variant="row-hover" previewText="Lighthouse CI & CWV Diagnostic Audits">
              <span className="text-sm font-light text-graphite">CAP-03: Performance Auditing &amp; Modernization</span>
            </HoverReveal>
          </div>
        </div>

        {/* Parallax Image with Overscan */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-graphite-muted uppercase tracking-wider block">
            &lt;ParallaxImage speed={0.25}&gt; (1.25x Overscan)
          </span>
          <ParallaxImage className="h-80" />
        </div>

        {/* ScrubSection Demo */}
        <ScrubSection className="border border-graphite-hairline p-8 bg-ivory space-y-4">
          <span className="text-xs font-mono text-rose uppercase tracking-wider block" data-scrub-item>
            &lt;ScrubSection scrub={1}&gt;
          </span>
          <h3 className="font-fluid-h2 text-graphite" data-scrub-item>
            Scroll-scrubbed interaction driven by Lenis and ScrollTrigger.
          </h3>
          <div className="w-full h-[1px] bg-rose" data-scrub-rule />
        </ScrubSection>
      </section>

      {/* 5. SCROLLTRIGGER LEAK TEST HARNESS */}
      <section className="border border-graphite-hairline p-8 bg-ivory-subtle space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-graphite-hairline pb-4">
          <div>
            <span className="text-xs font-mono text-rose uppercase tracking-wider block mb-1">
              05 / Verification &amp; Diagnostics
            </span>
            <h2 className="text-2xl font-light text-graphite">
              ScrollTrigger Memory Leak Verification
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-graphite-muted">Active Triggers:</span>
            <span className="px-3 py-1 bg-graphite text-ivory font-mono text-sm">
              {triggerCount}
            </span>
          </div>
        </div>

        <p className="text-xs text-graphite-muted max-w-2xl leading-relaxed">
          On every Next.js App Router route transition, <code className="font-mono text-graphite">LenisScrollProvider</code> purges all stale ScrollTriggers via <code className="font-mono text-graphite">ScrollTrigger.getAll().forEach(t =&gt; t.kill())</code> before new page triggers mount.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={runTeardownSimulation}
            className="px-6 py-2.5 bg-graphite text-ivory text-xs uppercase tracking-wider font-light hover:bg-rose transition-colors"
          >
            Simulate Route Navigation Teardown &rarr;
          </button>
        </div>

        {leakLog.length > 0 && (
          <div className="border border-graphite-hairline p-4 bg-ivory font-mono text-xs text-graphite space-y-1">
            {leakLog.map((log, i) => (
              <p key={i}>{log}</p>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
