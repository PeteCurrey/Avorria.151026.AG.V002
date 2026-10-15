import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Privacy Policy | Corporate Data Governance (US)",
  description:
    "Data privacy and protection policies for Avorria US operations. Compliant with California Consumer Privacy Act (CCPA/CPRA) and state privacy regulations.",
  path: "/us/privacy",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsPrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "US Home", path: "/us" },
          { name: "Privacy Policy", path: "/us/privacy" },
        ]}
      />

      {/* Legal Review Disclaimer Banner */}
      <div className="p-4 border border-rose/30 bg-rose/5 text-xs font-mono text-rose space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose inline-block" />
          <span className="uppercase tracking-widest font-semibold">
            Draft Specification &middot; Pending Formal Counsel Review
          </span>
        </div>
        <p className="text-graphite-muted font-light">
          This document reflects Avorria&apos;s data minimization architecture and is subject to periodic legal review under Delaware, New York, and California consumer privacy codes.
        </p>
      </div>

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted">
          <span>Effective Date: 15 April 2026</span>
          <Link href="/privacy" className="text-rose hover:underline">
            View UK Version (/privacy) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Privacy Policy (North America)
        </h1>
        <p className="text-base text-graphite-muted font-light leading-relaxed">
          Avorria operates as an elite digital systems partnership. Our US operations adhere strictly to data minimization principles: we do not sell personal data, maintain ad-network tracking pixels, or monetize executive communications.
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base font-light text-graphite leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">1. US Operational Entity</h2>
          <p>
            Inquiries and mandate discussions initiated within North America are managed by:
          </p>
          <div className="p-4 border border-graphite-hairline bg-ivory text-xs font-mono space-y-1 text-graphite-muted">
            <p className="text-graphite font-normal">Avorria Systems Practice (North America)</p>
            <p>One World Trade Center, Floor 85, New York, NY 10007</p>
            <p>Direct Contact: <a href="mailto:newyork@avorria.com" className="text-rose hover:underline">newyork@avorria.com</a></p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">2. California Consumer Privacy Statement (CCPA / CPRA)</h2>
          <p>
            Under the California Consumer Privacy Act, as amended by the California Privacy Rights Act (CPRA), California residents are entitled to specific disclosures:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-graphite-muted">
            <li>
              <strong>Categories of Personal Information Collected:</strong> Identifiers (name, corporate email, IP address) and professional/employment-related information (corporate organization, role).
            </li>
            <li>
              <strong>No Sale or Sharing of Personal Information:</strong> In the preceding 12 months, Avorria has <strong>never sold</strong> or <strong>shared</strong> personal information for cross-context behavioral advertising.
            </li>
            <li>
              <strong>Retention Standard:</strong> We retain executive communications for 24 months, after which records are purged from our secure data layer.
            </li>
            <li>
              <strong>Consumer Rights:</strong> You have the right to know what personal information we collect, request deletion, request correction of inaccurate data, and to not receive discriminatory treatment for exercising these statutory rights.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">3. Information Security Safeguards</h2>
          <p>
            All submitted specifications and database connections utilize TLS 1.3 encryption in transit and AES-256 encryption at rest. Internal database access is restricted by row-level security (RLS) policies and least-privilege identity access management.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">4. Exercising Your Statutory Rights</h2>
          <p>
            To submit an inquiry, request data deletion, or exercise statutory privacy rights under California, Colorado, Connecticut, Utah, or Virginia state frameworks, email our compliance team at <a href="mailto:privacy@avorria.com" className="text-rose hover:underline">privacy@avorria.com</a>.
          </p>
        </section>
      </div>

      <footer className="pt-8 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
        <Link href="/us/terms" className="text-graphite hover:text-rose">
          US Terms of Service &rarr;
        </Link>
        <Link href="/us/cookies" className="text-graphite hover:text-rose">
          Cookie Policy &rarr;
        </Link>
      </footer>
    </div>
  );
}
