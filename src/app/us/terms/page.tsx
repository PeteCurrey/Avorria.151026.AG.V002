import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Terms of Service | Corporate Systems Engagements (US)",
  description:
    "Standard terms of service and pre-contractual engagement parameters for Avorria North American architectural mandates.",
  path: "/us/terms",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsTermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "US Home", path: "/us" },
          { name: "Terms of Service", path: "/us/terms" },
        ]}
      />

      {/* Legal Review Disclaimer */}
      <div className="p-4 border border-rose/30 bg-rose/5 text-xs font-mono text-rose space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose inline-block" />
          <span className="uppercase tracking-widest font-semibold">
            Draft Specification &middot; Pending Formal Counsel Review
          </span>
        </div>
        <p className="text-graphite-muted font-light">
          These terms govern website usage and pre-contractual discussions in North America. Specific commercial mandates are governed exclusively by executed Master Services Agreements under New York State commercial law.
        </p>
      </div>

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted">
          <span>Effective Date: 15 April 2026</span>
          <Link href="/terms" className="text-rose hover:underline">
            View UK Terms (/terms) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Terms of Service (North America)
        </h1>
        <p className="text-base text-graphite-muted font-light leading-relaxed">
          Avorria operates as an elite digital systems practice. These terms set forth the legal framework governing interactions with our platform, preliminary diagnostic evaluations, and North American mandate scoping.
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base font-light text-graphite leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">1. Scope and North American Operations</h2>
          <p>
            These Terms of Service apply to enterprise visitors and leadership teams accessing <code>avorria.com/us</code>. For active technology implementations, executed Statements of Work (SOW) supersede these general parameters.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">2. Brand Name &amp; Proprietary Rights</h2>
          <p>
            The brand name is <strong>Avorria</strong> exclusively. All architectural materials, research publications in The Lobby, and benchmark frameworks published on this website are protected under United States and international copyright and trademark laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">3. Confidentiality &amp; Pre-Contractual Evaluation</h2>
          <p>
            Inquiries transmitted via <code>/us/contact</code> or <code>/us/audit</code> are treated with strict confidentiality. Custom NDA execution is available within four business hours of request prior to architecture inspection.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">4. Disclaimer of Diagnostic Warranties</h2>
          <p>
            Complimentary site audit deliverables represent technical diagnostic assessments based on external crawl observations. They are provided on an &quot;AS IS&quot; basis without warranty of any kind.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">5. Governing Law &amp; Dispute Resolution</h2>
          <p>
            These terms and any disputes arising hereunder shall be governed by and construed in accordance with the laws of the <strong>State of New York</strong>, without regard to conflict of law principles. Any legal action shall be instituted exclusively in the state or federal courts located in the Borough of Manhattan, New York.
          </p>
        </section>
      </div>

      <footer className="pt-8 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
        <Link href="/us/privacy" className="text-graphite hover:text-rose">
          US Privacy Policy &rarr;
        </Link>
        <Link href="/us/accessibility" className="text-graphite hover:text-rose">
          Accessibility Statement &rarr;
        </Link>
      </footer>
    </div>
  );
}
