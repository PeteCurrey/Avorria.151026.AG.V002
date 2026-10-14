import React from "react";
import Link from "next/link";
import { CAPABILITIES, ENGAGEMENT_SLOTS } from "@/content/capabilities";
import { ENGINEERING_STANDARDS } from "@/content/standards";
import { LazySceneWrapper } from "@/components/scene/LazySceneWrapper";
import { ScrubSection } from "@/components/motion/ScrubSection";
import { InquiryForm } from "@/components/forms/InquiryForm";

export default function HomePage() {
  return (
    <div className="relative">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-between px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto pt-12 pb-16">
        {/* Eyebrow & Geographic Indicators */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-light text-graphite-muted hairline-b pb-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
            <span className="uppercase tracking-widest text-[11px]">
              Avorria Engineering Practice
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span>London [UK] &middot; New York [USA]</span>
            <span className="text-graphite-hairline hidden sm:inline">|</span>
            <span className="hidden sm:inline">Next.js &middot; Vite &middot; React 19 &middot; AI Systems</span>
          </div>
        </div>

        {/* Hero Main Content & 3D Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12 lg:py-16">
          {/* Critical Text (Paints First for Instant LCP) */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-graphite tracking-tighter-display leading-[1.04]">
              Performance-first web platforms and production AI systems.
            </h1>
            <p className="text-base sm:text-lg text-graphite-muted font-light max-w-2xl leading-relaxed">
              Avorria architects bespoke digital platforms for enterprise clients across the UK and USA. We eliminate runtime bloat, replace opaque marketing promises with deterministic benchmarks, and engineer resilient systems designed for mission-critical operations.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                className="px-8 py-4 bg-graphite text-ivory text-xs uppercase tracking-widest font-light hover:bg-rose transition-colors duration-200 focus-visible:outline-rose"
              >
                Inquire on Mandate
              </Link>
              <Link
                href="/capabilities"
                className="px-8 py-4 border border-graphite-hairline text-graphite text-xs uppercase tracking-widest font-light hover:border-graphite transition-colors duration-200 focus-visible:outline-rose"
              >
                Explore Capabilities &rarr;
              </Link>
            </div>
          </div>

          {/* Single Architectural 3D Scene (Code-Split, Non-Blocking) */}
          <div className="lg:col-span-5 h-[360px] sm:h-[440px] lg:h-[520px] relative border border-graphite-hairline bg-ivory-subtle/50">
            <div className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest text-graphite-muted">
              Spatial Datum &middot; Fig. 01
            </div>
            <div className="absolute bottom-4 right-4 z-10 text-[10px] font-mono text-graphite-muted">
              R3F / THREE.JS / RESTRAINED
            </div>
            <LazySceneWrapper />
          </div>
        </div>

        {/* Hero Metadata Footing */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 hairline-t text-xs font-light text-graphite-muted">
          <div>
            <span className="block text-[11px] text-graphite uppercase tracking-wider mb-1">
              Performance Target
            </span>
            <span>LCP &lt; 2.0s &middot; CLS &lt; 0.02</span>
          </div>
          <div>
            <span className="block text-[11px] text-graphite uppercase tracking-wider mb-1">
              Architecture
            </span>
            <span>React 19 &middot; Next.js Edge</span>
          </div>
          <div>
            <span className="block text-[11px] text-graphite uppercase tracking-wider mb-1">
              AI Engineering
            </span>
            <span>Deterministic Pipelines</span>
          </div>
          <div>
            <span className="block text-[11px] text-graphite uppercase tracking-wider mb-1">
              Accessibility
            </span>
            <span>WCAG 2.2 Level AA Verified</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: EDITORIAL ARCHITECTURAL MANIFESTO */}
      <ScrubSection className="py-24 sm:py-32 bg-ivory hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" data-scrub-item>
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest text-rose font-light block mb-2">
                Engineering Discipline
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-graphite tracking-tight-display">
                The Philosophy of Restraint
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-graphite-muted font-light leading-relaxed">
              <p>
                The contemporary web has surrendered to gratuitous abstraction. Megabytes of redundant JavaScript, erratic layout shifts, and superficial AI gimmicks now disguise fragility as innovation.
              </p>
              <p>
                Avorria operates under an architectural ethos akin to private banking and classical industrial design: every byte must be justified, every render cycle accounted for, and every interface built to endure. We deploy React 19 and Next.js App Router not for novelty, but for absolute control over hydration boundaries and latency.
              </p>
              <div className="pt-4 flex items-center gap-4 text-xs font-light text-graphite">
                <span className="w-8 h-[1px] bg-rose" data-scrub-rule />
                <span>Zero bloated dependencies &middot; Deterministic benchmarks only</span>
              </div>
            </div>
          </div>
        </div>
      </ScrubSection>

      {/* SECTION 3: CAPABILITIES */}
      <ScrubSection id="capabilities" className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 hairline-b" data-scrub-item>
          <div>
            <span className="text-xs uppercase tracking-widest text-rose font-light block mb-2">
              Core Practices
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-graphite tracking-tight-display">
              Technical Capabilities
            </h2>
          </div>
          <p className="text-sm font-light text-graphite-muted max-w-md">
            Specialized engineering delivery focused on three core disciplines. No generalist dilution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              data-scrub-item
              className="border border-graphite-hairline p-8 flex flex-col justify-between bg-ivory hover:border-graphite/40 transition-colors duration-200"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-light text-graphite-muted">
                  <span className="font-mono text-rose">{cap.code}</span>
                  <span className="uppercase tracking-wider text-[11px]">{cap.category}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-graphite tracking-tight-display">
                  {cap.title}
                </h3>

                <p className="text-xs text-graphite font-light leading-relaxed">
                  {cap.headline}
                </p>

                <p className="text-xs text-graphite-muted font-light leading-relaxed">
                  {cap.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-graphite-hairline">
                  <span className="text-[10px] uppercase tracking-wider text-graphite-muted block">
                    Core Deliverables
                  </span>
                  <ul className="space-y-1.5 text-xs text-graphite-muted font-light">
                    {cap.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose text-[10px] mt-0.5">&mdash;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-graphite-hairline mt-8 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-graphite-muted block">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cap.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-ivory-subtle text-[11px] text-graphite font-light border border-graphite-hairline"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrubSection>

      {/* SECTION 4: ENGINEERING STANDARDS & AUDIT MATRIX */}
      <ScrubSection id="standards" className="py-24 sm:py-32 bg-ivory-subtle hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="pb-12 hairline-b" data-scrub-item>
            <span className="text-xs uppercase tracking-widest text-rose font-light block mb-2">
              Measurable Accountability
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-graphite tracking-tight-display">
              Engineering Standards
            </h2>
            <p className="text-sm font-light text-graphite-muted max-w-xl mt-3">
              We contractually commit to quantitative performance thresholds. Every deliverable is gated by automated CI verification.
            </p>
          </div>

          <div className="pt-8 overflow-x-auto" data-scrub-item>
            <table className="w-full text-left border-collapse" role="table">
              <thead>
                <tr className="border-b border-graphite-hairline text-xs uppercase tracking-wider text-graphite-muted font-light">
                  <th scope="col" className="py-4 pr-6">Category</th>
                  <th scope="col" className="py-4 pr-6">Metric</th>
                  <th scope="col" className="py-4 pr-6">Target Threshold</th>
                  <th scope="col" className="py-4 pr-6">Enforcement Mechanism</th>
                  <th scope="col" className="py-4">Architectural Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-hairline text-xs font-light">
                {ENGINEERING_STANDARDS.map((std, idx) => (
                  <tr key={idx} className="hover:bg-ivory/60 transition-colors">
                    <td className="py-4 pr-6 text-graphite-muted">{std.category}</td>
                    <td className="py-4 pr-6 text-graphite">{std.metric}</td>
                    <td className="py-4 pr-6 font-mono text-rose">{std.threshold}</td>
                    <td className="py-4 pr-6 text-graphite-muted">{std.enforcement}</td>
                    <td className="py-4 text-graphite-muted max-w-xs">{std.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrubSection>

      {/* SECTION 5: CLIENT ENGAGEMENT SLOTS (NO FABRICATED DATA) */}
      <ScrubSection id="engagements" className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="pb-12 hairline-b" data-scrub-item>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
            <span className="text-xs uppercase tracking-widest text-rose font-light">
              Verified Transparency
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-graphite tracking-tight-display">
            Engagement &amp; Case Study Allocation
          </h2>
          <p className="text-sm font-light text-graphite-muted max-w-2xl mt-3 leading-relaxed">
            Avorria maintains strict non-disclosure obligations for institutional partners. We do not invent fictional metrics, fabricate client logos, or publish sanitized case studies without explicit legal clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12" data-scrub-item>
          {ENGAGEMENT_SLOTS.map((slot) => (
            <div
              key={slot.id}
              className="border border-graphite-hairline p-6 bg-ivory space-y-4 relative"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider text-[11px] text-graphite-muted font-light">
                  {slot.type}
                </span>
                <span className="text-[11px] font-mono text-rose">
                  [{slot.jurisdiction}]
                </span>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono px-2 py-0.5 bg-ivory-subtle border border-graphite-hairline inline-block mb-3 text-graphite">
                  Status: {slot.status}
                </span>
                <h3 className="text-base font-light text-graphite">
                  {slot.sector}
                </h3>
                <p className="text-xs font-light text-graphite-muted mt-2 leading-relaxed">
                  {slot.scopeSummary}
                </p>
              </div>

              <div className="pt-4 border-t border-graphite-hairline text-[11px] text-graphite-muted">
                Governed under London / New York Corporate Law
              </div>
            </div>
          ))}
        </div>
      </ScrubSection>

      {/* SECTION 6: INQUIRY TERMINAL */}
      <ScrubSection id="inquire" className="py-24 sm:py-32 bg-ivory-subtle hairline-t">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12" data-scrub-item>
          <InquiryForm />
        </div>
      </ScrubSection>
    </div>
  );
}
