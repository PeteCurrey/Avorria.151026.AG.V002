import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Audit Request Confirmed | Avorria Diagnostic Intake (US)",
  description: "Your platform architecture audit request has been successfully registered.",
  path: "/us/audit/confirmed",
  locale: "en-US",
  hasUsAlternate: true,
  noindex: true,
});

interface ConfirmedPageProps {
  searchParams: Promise<{ ref?: string; target?: string }>;
}

export default async function UsAuditConfirmedPage({ searchParams }: ConfirmedPageProps) {
  const { ref, target } = await searchParams;
  const referenceToken = ref || "AVR-AUDIT-TRANSMITTED";

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "US Home", path: "/us" },
          { name: "Audit", path: "/us/audit" },
          { name: "Confirmed", path: "/us/audit/confirmed" },
        ]}
      />

      <div className="border border-graphite-hairline bg-ivory p-8 sm:p-12 space-y-8">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose inline-block" />
          <span className="text-xs font-mono uppercase tracking-widest text-graphite">
            Intake Registered &middot; {referenceToken}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extralight text-graphite tracking-tight">
            Architectural Audit Scheduled
          </h1>
          <p className="text-base text-graphite-muted font-light leading-relaxed">
            We have registered your evaluation request{target ? ` for ${target}` : ""}. Preliminary telemetry collection begins immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-graphite-hairline text-xs font-light">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-rose block">
              What Happens Next
            </span>
            <p className="text-graphite-muted leading-relaxed">
              Our automated crawlers will perform synthetic 4G throttled profiling and map initial canonical/hreflang topologies across key templates.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-rose block">
              Delivery SLA
            </span>
            <p className="text-graphite-muted leading-relaxed">
              A systems partner will compile your ranked remediation backlog and transmit diagnostic findings within <strong>48 business hours</strong>.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-graphite-hairline flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <Link
            href="/us"
            className="text-graphite hover:text-rose transition-colors"
          >
            &larr; Return to US Home
          </Link>
          <Link
            href="/lobby"
            className="text-rose hover:underline"
          >
            Read Architectural Essays in The Lobby &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
