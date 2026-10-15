import React from "react";
import Link from "next/link";
import { LOCATIONS } from "@/content/data/locations";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HubClock } from "./HubClocks";

export function InternationalSection() {
  const ukHub = LOCATIONS.find((l) => l.code === "LON")!;
  const usHub = LOCATIONS.find((l) => l.code === "NYC")!;

  return (
    <section
      id="international"
      className="w-full py-24 sm:py-32 bg-ivory text-graphite border-b border-graphite-hairline"
      aria-label="Avorria International Presence"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-graphite-hairline">
          <SectionHeader
            eyebrow="07 / Transatlantic Footprint"
            heading="London &amp; New York Operations"
            lead="Avorria operates across two primary global financial centers. Our dual-hub structure delivers synchronous real-time engineering overlap and continuous deployment across UK and US markets."
          />
          <div className="flex items-center gap-4 text-xs font-mono text-graphite-muted shrink-0">
            <span>Synchronous Window: 13:00–17:00 GMT</span>
          </div>
        </div>

        {/* Dual Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* London Hub */}
          <div className="border border-graphite-hairline p-8 sm:p-10 bg-ivory space-y-8 relative">
            <div className="flex items-center justify-between border-b border-graphite-hairline pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose" />
                <span className="text-xs font-mono uppercase tracking-widest text-graphite">
                  United Kingdom Headquarters
                </span>
              </div>
              <HubClock timeZone="Europe/London" fallback="GMT / BST" />
            </div>

            <div className="space-y-3">
              <h3 className="font-fluid-h2 font-extralight text-graphite">
                London [LON]
              </h3>
              <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
                Operating out of the City of London, directing engineering mandates across the UK and European economic areas. Governed under English corporate law.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-graphite-hairline text-xs font-mono text-graphite-muted">
              <div className="flex items-center justify-between">
                <span>Address:</span>
                <span className="text-graphite">
                  {ukHub.postalAddress.streetAddress}, {ukHub.postalAddress.postalCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Direct Telephone:</span>
                <span className="text-graphite">{ukHub.telephone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Transmission:</span>
                <span className="text-rose">{ukHub.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Governing Law:</span>
                <span className="text-graphite">England &amp; Wales</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block text-xs uppercase tracking-wider text-graphite hover:text-rose underline-sweep"
              >
                Inquire with London Partners &rarr;
              </Link>
            </div>
          </div>

          {/* New York Hub */}
          <div className="border border-graphite-hairline p-8 sm:p-10 bg-ivory space-y-8 relative">
            <div className="flex items-center justify-between border-b border-graphite-hairline pb-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose" />
                <span className="text-xs font-mono uppercase tracking-widest text-graphite">
                  United States Operations
                </span>
              </div>
              <HubClock timeZone="America/New_York" fallback="EST / EDT" />
            </div>

            <div className="space-y-3">
              <h3 className="font-fluid-h2 font-extralight text-graphite">
                New York [NYC]
              </h3>
              <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed">
                Directing enterprise AI engineering and web performance platforms across North American markets. Governed under Delaware and New York corporate law.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-graphite-hairline text-xs font-mono text-graphite-muted">
              <div className="flex items-center justify-between">
                <span>Address:</span>
                <span className="text-graphite">
                  {usHub.postalAddress.streetAddress}, {usHub.postalAddress.postalCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Direct Telephone:</span>
                <span className="text-graphite">{usHub.telephone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Transmission:</span>
                <span className="text-rose">{usHub.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Governing Law:</span>
                <span className="text-graphite">Delaware / New York State</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/us/contact"
                className="inline-block text-xs uppercase tracking-wider text-graphite hover:text-rose underline-sweep"
              >
                Inquire with New York Partners &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Transatlantic Overlap Banner */}
        <div className="p-8 border border-graphite-hairline bg-ivory-subtle space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-graphite-hairline pb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-graphite">
              Synchronous Engagement Protocol
            </span>
            <span className="text-[11px] font-mono text-rose">
              08:00–12:00 EST &harr; 13:00–17:00 GMT
            </span>
          </div>
          <p className="text-xs sm:text-sm text-graphite-muted font-light leading-relaxed max-w-4xl">
            Our teams operate on an engineered 4-hour synchronous overlap window each business day for joint architecture reviews, paired client sessions, and production releases. Transatlantic engineering handoffs ensure 16-hour continuous build velocity without communication lag.
          </p>
        </div>
      </div>
    </section>
  );
}
