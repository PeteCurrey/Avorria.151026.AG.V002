import React from "react";
import Link from "next/link";
import { OFFICE_PRESENCES } from "@/content/standards";

export function Footer() {
  return (
    <footer className="theme-dark bg-graphite text-ivory hairline-t transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        {/* Top Monolithic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 pb-16 hairline-b">
          {/* Brand & Mandate */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-ivory hover:text-rose-dark transition-colors"
              aria-label="Avorria home"
            >
              <span className="font-extralight text-3xl sm:text-4xl tracking-tighter-display uppercase">
                Avorria
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-dark inline-block" />
            </Link>
            <p className="text-sm font-light text-graphite-muted max-w-md leading-relaxed">
              Performance-first digital platforms and production AI systems engineered for corporate enterprises across the United Kingdom and United States.
            </p>
            <div className="pt-2 text-xs font-light text-graphite-muted space-y-1">
              <p>Work Sans typography &middot; React 19 &middot; Next.js App Router</p>
              <p>Strict performance budget: Mobile LCP &lt; 2.0s &middot; WCAG 2.2 AA</p>
            </div>
          </div>

          {/* Operational Hubs */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-graphite-muted font-light">
              Operational Hubs
            </h3>
            <div className="space-y-6">
              {OFFICE_PRESENCES.map((office) => (
                <div key={office.code} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-light text-ivory">{office.city}</span>
                    <span className="text-xs text-rose-dark font-light">[{office.code}]</span>
                  </div>
                  <p className="text-xs font-light text-graphite-muted">
                    {office.region} &middot; {office.jurisdiction}
                  </p>
                  <p className="text-xs font-light text-graphite-muted/80">
                    {office.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation & Direct Channels */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-graphite-muted font-light">
              Direct Channels
            </h3>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link
                  href="/capabilities"
                  className="text-graphite-muted hover:text-ivory transition-colors block py-0.5"
                >
                  Technical Capabilities
                </Link>
              </li>
              <li>
                <Link
                  href="/#standards"
                  className="text-graphite-muted hover:text-ivory transition-colors block py-0.5"
                >
                  Engineering Standards
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-graphite-muted hover:text-ivory transition-colors block py-0.5"
                >
                  Executive Inquiries
                </Link>
              </li>
              <li>
                <a
                  href="mailto:partner@avorria.com"
                  className="text-rose-dark hover:underline block py-0.5 text-xs font-light tracking-wide"
                >
                  partner@avorria.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-light text-graphite-muted">
          <div className="space-y-1">
            <p>&copy; {new Date().getFullYear()} Avorria. All rights reserved.</p>
            <p className="text-[11px] text-graphite-muted/70">
              Corporate digital agency operating in England, Wales, Delaware, and New York.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span>Security Architecture Verified</span>
            <span className="text-graphite-hairline">/</span>
            <span>Zero Tracking Cookies</span>
            <span className="text-graphite-hairline">/</span>
            <span>Strict WCAG 2.2 AA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
