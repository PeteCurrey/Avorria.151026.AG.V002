import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Privacy Policy | Corporate Data Governance",
  description:
    "Data privacy and protection policies for Avorria UK & US operations. Compliant with UK GDPR, EU GDPR, and US State Privacy frameworks.",
  path: "/privacy",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
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
          This document reflects Avorria&apos;s current data minimization architecture and is subject to periodic legal review under English common law and Delaware / New York State commercial codes.
        </p>
      </div>

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted">
          <span>Effective Date: 15 April 2026</span>
          <Link href="/us/privacy" className="text-rose hover:underline">
            View US Version (/us/privacy) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Privacy Policy &amp; Data Governance
        </h1>
        <p className="text-base text-graphite-muted font-light leading-relaxed">
          Avorria operates as an elite digital systems partnership. Our data processing principles are defined by rigorous minimization: we do not monetize personal data, employ cross-site tracking scripts, or maintain marketing retargeting pixels.
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base font-light text-graphite leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">1. Data Controller Identification</h2>
          <p>
            For corporate communications and inquiries originating in the United Kingdom and the European Economic Area, the data controller is:
          </p>
          <div className="p-4 border border-graphite-hairline bg-ivory text-xs font-mono space-y-1 text-graphite-muted">
            <p className="text-graphite font-normal">Avorria Systems Practice (UK)</p>
            <p>1 Poultry, London, EC2R 8EJ, United Kingdom</p>
            <p>Direct Privacy Contact: <a href="mailto:privacy@avorria.com" className="text-rose hover:underline">privacy@avorria.com</a></p>
          </div>
          <p>
            For inquiries originating within North America, data is processed under the governance of Avorria&apos;s New York hub (One World Trade Center, Floor 85, New York, NY 10007).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">2. Categories of Information Collected</h2>
          <p>
            We process strictly the minimum necessary personal data required to initiate and service enterprise client mandates:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-graphite-muted">
            <li>
              <strong>Mandate Inquiry Data:</strong> Full name, professional title, corporate affiliation, corporate email address, and project requirements submitted via <code>/contact</code> or <code>/audit</code>.
            </li>
            <li>
              <strong>Security &amp; Telemetry Data:</strong> IP address, browser user-agent header, and Cloudflare Turnstile verification tokens collected strictly for bot mitigation, rate limiting, and DDoS defense.
            </li>
            <li>
              <strong>Technical Audit Targets:</strong> Publicly reachable URLs provided voluntarily by technical directors commissioning our architectural audits.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">3. Lawful Basis for Processing (UK / EU GDPR)</h2>
          <p>
            We process your personal information under the following legal bases pursuant to Article 6 of the UK General Data Protection Regulation:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-graphite-muted">
            <li>
              <strong>Contractual Steps (Art. 6(1)(b)):</strong> Processing necessary to take preliminary steps at your request prior to entering into an enterprise services agreement.
            </li>
            <li>
              <strong>Legitimate Interests (Art. 6(1)(f)):</strong> Enforcing infrastructure security, preventing automated bot abuse, and maintaining transmission audit logs.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">4. Third-Party Infrastructure &amp; International Transfers</h2>
          <p>
            Avorria utilizes enterprise infrastructure providers subject to Standard Contractual Clauses (SCCs) and the UK International Data Transfer Addendum:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-graphite-muted">
            <li><strong>Vercel Inc.</strong> (Application hosting and CDN edge computing)</li>
            <li><strong>Supabase Inc.</strong> (Encrypted PostgreSQL database store with row-level security)</li>
            <li><strong>Cloudflare Inc.</strong> (Turnstile CAPTCHA-free bot challenge protection)</li>
          </ul>
          <p>
            We never sell, rent, license, or syndication personal data to data brokers or third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">5. Data Retention &amp; Erasure</h2>
          <p>
            Mandate inquiries that do not progress to an executed commercial agreement are automatically purged after 24 months. Audit diagnostic logs are retained for 12 months. You hold the unconditional right to request erasure, rectification, or data portability by transmitting an instruction to <a href="mailto:privacy@avorria.com" className="text-rose hover:underline">privacy@avorria.com</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">6. Supervisory Authority Recourse</h2>
          <p>
            If you believe our data processing violates applicable data protection statutes, UK residents have the right to lodge a formal complaint with the Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-rose hover:underline">ico.org.uk</a>.
          </p>
        </section>
      </div>

      <footer className="pt-8 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
        <Link href="/terms" className="text-graphite hover:text-rose">
          Terms of Business &rarr;
        </Link>
        <Link href="/cookies" className="text-graphite hover:text-rose">
          Cookie Policy &rarr;
        </Link>
      </footer>
    </div>
  );
}
