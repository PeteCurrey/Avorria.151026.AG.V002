"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TEAM_MEMBERS } from "@/content/data/team";
import { LOCATIONS } from "@/content/data/locations";

interface AboutViewProps {
  market?: "UK" | "US";
}

export function AboutView({ market = "UK" }: AboutViewProps) {
  const [londonTime, setLondonTime] = useState("");
  const [nyTime, setNyTime] = useState("");

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setLondonTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
      );
      setNyTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
      );
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  const isUs = market === "US";
  const prefix = isUs ? "/us" : "";

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
      {/* 1. Founder-Led Story Hero */}
      <section className="space-y-8 border-b border-graphite-hairline pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose inline-block" />
            <span className="uppercase tracking-widest text-graphite-muted font-mono text-[11px]">
              Foundational Thesis &middot; {isUs ? "New York & London" : "London & New York"}
            </span>
          </div>
          <span className="text-xs font-mono text-graphite-muted">
            Founded 2024 &middot; Private Partnership
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-graphite tracking-tighter-display leading-[1.05] max-w-5xl">
          Engineered for Ambition. Bound by Invariants.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg font-light text-graphite leading-relaxed">
            <p>
              Avorria was founded on a singular engineering conviction: the modern enterprise web platform has surrendered architectural discipline in pursuit of superficial velocity. Over the last decade, bundle sizes quadrupled, median interaction latencies worsened, and conversational AI prototypes flooded boardrooms without surviving basic compliance reviews.
            </p>
            <p className="text-graphite-muted">
              We reject this bloat. Led by Technical Director <strong>Pete Currey</strong> and our systems partners across London and New York, Avorria operates as an elite technical practice. We build performance-first web platforms on React 19, Next.js, and Vite, coupled with deterministic AI systems designed for regulated corporate environments.
            </p>
            <p className="text-graphite-muted">
              We do not act as a traditional marketing agency or an offshore staffing shop. We are principal systems architects, compilers specialists, and distributed systems engineers who treat sub-second response times and auditability as mathematical contracts.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6 p-8 border border-graphite-hairline bg-ivory">
            <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
              The Avorria Operating Charter
            </div>
            <ul className="space-y-4 text-xs font-light text-graphite">
              <li className="flex items-start gap-3">
                <span className="font-mono text-rose text-sm">&mdash;</span>
                <div>
                  <strong className="font-normal">No Fabricated Metrics:</strong> We report only verified telemetry measured under real cellular network throttling.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-rose text-sm">&mdash;</span>
                <div>
                  <strong className="font-normal">Zero Unnecessary Hydration:</strong> Server components remain the default execution mode; client JS must justify every kilobyte.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-rose text-sm">&mdash;</span>
                <div>
                  <strong className="font-normal">Deterministic AI State Machines:</strong> Probabilistic models operate inside rigid Zod schema boundaries with append-only audit trails.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-rose text-sm">&mdash;</span>
                <div>
                  <strong className="font-normal">Principal-Led Engagements:</strong> Every mandate is directly architected by partner-level engineers, not passed to junior pools.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Architectural Principles */}
      <section className="space-y-12">
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
            Core Principles
          </div>
          <h2 className="text-3xl sm:text-4xl font-extralight text-graphite tracking-tight">
            The Invariants Governing Our Engineering
          </h2>
          <p className="text-sm text-graphite-muted font-light max-w-2xl">
            These four invariants are enforced in our automated CI pipelines and written into our client engagement contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-graphite-hairline bg-ivory space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
              <span className="text-rose">Invariant 01</span>
              <span>Performance Invariant</span>
            </div>
            <h3 className="text-xl font-light text-graphite">
              Sub-Second Rendering is an Invariant, Not an Optimization
            </h3>
            <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
              Performance cannot be patched post-launch. We design page trees, font loading strategies, and asset delivery pipelines so that Largest Contentful Paint (LCP) occurs under 1.2s on throttled 4G mobile devices. If a pull request degrades this budget, CI blocks deployment.
            </p>
          </div>

          <div className="p-8 border border-graphite-hairline bg-ivory space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
              <span className="text-rose">Invariant 02</span>
              <span>Execution Boundary</span>
            </div>
            <h3 className="text-xl font-light text-graphite">
              Server-First Execution by Default
            </h3>
            <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
              In React 19 and Next.js App Router, the majority of page components never emit client-side JavaScript. Typography, layout grids, navigation shells, and data fetching execute on the server and CDN edge, keeping the user's main thread unblocked for instantaneous paints.
            </p>
          </div>

          <div className="p-8 border border-graphite-hairline bg-ivory space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
              <span className="text-rose">Invariant 03</span>
              <span>System Verification</span>
            </div>
            <h3 className="text-xl font-light text-graphite">
              Deterministic AI over Chatbot Demos
            </h3>
            <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
              We do not build conversational wrappers that hallucinate in production. We engineer multi-agent state machines where model outputs are validated against formal Zod schemas, confidence scores route edge-cases to human review, and every execution step writes to an immutable audit log.
            </p>
          </div>

          <div className="p-8 border border-graphite-hairline bg-ivory space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-3">
              <span className="text-rose">Invariant 04</span>
              <span>Supply Chain Hygiene</span>
            </div>
            <h3 className="text-xl font-light text-graphite">
              Zero Unmeasured Third-Party Spawning Chains
            </h3>
            <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
              Third-party analytics and marketing scripts are the single largest source of performance decay, security vulnerability, and privacy leakage. We govern external tags through a strict repository Tag Map with zero tolerance for unapproved tag managers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Operational Presences: London and New York */}
      <section className="space-y-12 border-t border-graphite-hairline pt-16">
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
            Transatlantic Footprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-extralight text-graphite tracking-tight">
            London &amp; New York Dual Presence
          </h2>
          <p className="text-sm text-graphite-muted font-light max-w-2xl">
            Avorria operates as a unified practice governed under English common law and Delaware / New York State commercial law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS.map((loc) => {
            const isLon = loc.code === "LON";
            const time = isLon ? londonTime : nyTime;
            return (
              <div
                key={loc.code}
                className="p-8 border border-graphite-hairline bg-ivory space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-graphite-hairline pb-3">
                    <span className="text-rose font-medium">
                      {loc.city} Hub [{loc.code}]
                    </span>
                    <span className="text-graphite-muted">
                      Local Time: <span className="text-graphite">{time || "--:--:--"}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-light text-graphite">
                    {loc.city}, {loc.country}
                  </h3>

                  <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
                    {loc.focus}
                  </p>
                </div>

                <div className="pt-6 border-t border-graphite-hairline space-y-2 text-xs font-mono text-graphite-muted">
                  <div className="text-graphite">
                    {loc.postalAddress.streetAddress}, {loc.postalAddress.postalCode}
                  </div>
                  <div>Jurisdiction: {loc.jurisdiction}</div>
                  <div>Direct: <a href={`mailto:${loc.email}`} className="text-rose hover:underline">{loc.email}</a></div>
                  <div>Tel: {loc.telephone}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Leadership & Team */}
      <section className="space-y-12 border-t border-graphite-hairline pt-16">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
              Practice Leadership
            </div>
            <span className="text-[11px] font-mono text-graphite-muted">
              Direct Senior Engagement
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extralight text-graphite tracking-tight">
            Principals &amp; Systems Architects
          </h2>
          <p className="text-sm text-graphite-muted font-light max-w-2xl">
            We do not employ non-technical account managers or junior delivery layers. Every client engagement is led by named partners who write and review production code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="border border-graphite-hairline bg-ivory p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Visual Editorial Plate (Flagged placeholder for real leadership) */}
                <div className="relative aspect-square w-full bg-graphite flex flex-col items-center justify-center p-6 text-center border border-graphite-hairline">
                  <div className="text-4xl font-extralight text-ivory tracking-widest">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-rose">
                    {member.locationCode === "LON" ? "London Hub" : "New York Hub"}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-[9px] font-mono text-white/40 uppercase tracking-tighter">
                    Editorial Representation &middot; Real Leadership
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-light text-graphite">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-rose">
                    {member.role}
                  </div>
                  <p className="text-xs font-light text-graphite-muted leading-relaxed pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
                <span className="text-graphite-muted">
                  {member.locationCode === "LON" ? "City of London" : "Manhattan, NYC"}
                </span>
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose hover:underline"
                >
                  Profile &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How We Work (The Engagement Model) */}
      <section className="space-y-12 border-t border-graphite-hairline pt-16">
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
            Delivery Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extralight text-graphite tracking-tight">
            How We Execute Enterprise Mandates
          </h2>
          <p className="text-sm text-graphite-muted font-light max-w-2xl">
            A four-phase architectural process designed for determinism, predictable release cadence, and mathematical verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 border border-graphite-hairline bg-ivory space-y-3">
            <div className="text-xs font-mono text-rose">Stage 01</div>
            <h3 className="text-base font-light text-graphite">
              Invariant Audit &amp; Specification
            </h3>
            <p className="text-xs font-light text-graphite-muted leading-relaxed">
              We audit existing telemetry, crawl topology, and server boundaries. We establish contractual performance invariants (LCP, bundle size, uptime, schema validity) before any code is written.
            </p>
          </div>

          <div className="p-6 border border-graphite-hairline bg-ivory space-y-3">
            <div className="text-xs font-mono text-rose">Stage 02</div>
            <h3 className="text-base font-light text-graphite">
              Isolated Island Engineering
            </h3>
            <p className="text-xs font-light text-graphite-muted leading-relaxed">
              Platforms are built server-first on React 19 and Next.js App Router. Motion and interactivity are isolated to composited client islands without blocking main-thread document parsing.
            </p>
          </div>

          <div className="p-6 border border-graphite-hairline bg-ivory space-y-3">
            <div className="text-xs font-mono text-rose">Stage 03</div>
            <h3 className="text-base font-light text-graphite">
              Throttled Field Verification
            </h3>
            <p className="text-xs font-light text-graphite-muted leading-relaxed">
              Testing occurs on real mid-tier mobile hardware throttled to 4G latency. Every page must pass zero layout shift (CLS &lt; 0.02) and sub-second rendering under adverse network conditions.
            </p>
          </div>

          <div className="p-6 border border-graphite-hairline bg-ivory space-y-3">
            <div className="text-xs font-mono text-rose">Stage 04</div>
            <h3 className="text-base font-light text-graphite">
              Transatlantic Telemetry &amp; SRE
            </h3>
            <p className="text-xs font-light text-graphite-muted leading-relaxed">
              Deployment to globally distributed edge nodes with dual Search Console property telemetry, continuous bundle gate monitoring, and automated drift prevention.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Direct Inquiries CTA */}
      <section className="border border-graphite-hairline bg-ivory p-8 sm:p-12 space-y-6">
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
            Mandate Initiation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extralight text-graphite tracking-tight">
            Initiate a Technical Discussion
          </h2>
          <p className="text-sm font-light text-graphite-muted max-w-xl leading-relaxed">
            Connect directly with Pete Currey and our systems architecture leadership in London or New York. All preliminary discussions are held under mutual NDA.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={`${prefix}/contact`}
            className="px-6 py-3 bg-graphite text-ivory text-xs font-mono uppercase tracking-wider hover:bg-rose transition-colors"
          >
            Inquire on a Mandate &rarr;
          </Link>
          <Link
            href={`${prefix}/audit`}
            className="px-6 py-3 border border-graphite-hairline text-graphite text-xs font-mono uppercase tracking-wider hover:border-graphite transition-colors"
          >
            Request Free Architectural Audit &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
