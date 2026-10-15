import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Terms of Business | Corporate Systems Engagements",
  description:
    "Standard terms of business and pre-contractual engagement parameters for Avorria UK & EMEA architectural mandates.",
  path: "/terms",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Business", path: "/terms" },
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
          These terms govern website usage and pre-contractual evaluation. Specific enterprise mandates are governed exclusively by executed Master Services Agreements (MSA) and Statements of Work (SOW) under the laws of England &amp; Wales.
        </p>
      </div>

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted">
          <span>Effective Date: 15 April 2026</span>
          <Link href="/us/terms" className="text-rose hover:underline">
            View US Terms (/us/terms) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Terms of Business &amp; Mandate Governance
        </h1>
        <p className="text-base text-graphite-muted font-light leading-relaxed">
          Avorria operates as an elite digital systems practice. These terms set forth the legal framework governing interactions with our platform, preliminary diagnostic audits, and mandate initiation.
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base font-light text-graphite leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">1. Scope and Applicability</h2>
          <p>
            These Terms of Business apply to all visitors to <code>avorria.com</code> and technical directors submitting specifications or audit requests. For formal software engineering and AI systems mandates, an executed Statement of Work (SOW) supersedes these general terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">2. Brand Name &amp; Intellectual Property</h2>
          <p>
            The brand name is <strong>Avorria</strong> exclusively. All architectural essays in The Lobby, proprietary diagnostic methodologies, motion engine primitives, and design system tokens are the intellectual property of Avorria Systems Practice. Unauthorised reproduction, web scraping for AI model training, or commercial republication is strictly prohibited.
          </p>
          <p>
            For client mandates, all bespoke application source code, custom schemas, and proprietary business logic transfer to the client upon full payment of fees in accordance with the applicable SOW.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">3. Confidentiality &amp; Bilateral Non-Disclosure</h2>
          <p>
            All technical specifications, repository access tokens, and architectural diagrams transmitted via <code>/contact</code> or <code>/audit</code> are treated as confidential information. Avorria will execute a standard bilateral NDA prior to detailed codebase inspection upon request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">4. Performance Invariant Guarantees</h2>
          <p>
            Where an executed SOW specifies Core Web Vitals performance benchmarks (e.g., LCP &lt; 1.2s on throttled cellular networks, CLS &lt; 0.02), such metrics serve as formal contractual acceptance criteria. Performance is verified using automated CI gates and real-user field telemetry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">5. Limitation of Liability</h2>
          <p>
            Complimentary site audits provided via <code>/audit</code> are diagnostic evaluations provided without warranty of any kind. In no event shall Avorria be liable for any indirect, incidental, or consequential damages arising from reliance on preliminary audit findings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">6. Governing Law &amp; Jurisdiction</h2>
          <p>
            These terms and any disputes arising out of pre-contractual discussions in the UK and EMEA shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>, subject to the exclusive jurisdiction of the courts of London.
          </p>
        </section>
      </div>

      <footer className="pt-8 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
        <Link href="/privacy" className="text-graphite hover:text-rose">
          Privacy Policy &rarr;
        </Link>
        <Link href="/accessibility" className="text-graphite hover:text-rose">
          Accessibility Statement &rarr;
        </Link>
      </footer>
    </div>
  );
}
