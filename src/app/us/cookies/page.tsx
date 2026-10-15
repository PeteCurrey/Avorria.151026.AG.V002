import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Cookie Policy | Strict Zero-Tracking Architecture (US)",
  description:
    "Avorria&apos;s architectural commitment to privacy: Zero third-party marketing cookies, zero retargeting pixels, and minimal essential session tokens.",
  path: "/us/cookies",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsCookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "US Home", path: "/us" },
          { name: "Cookie Policy", path: "/us/cookies" },
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
          Complies with US state data privacy disclosures and federal FTC transparency standards.
        </p>
      </div>

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted">
          <span>Effective Date: 15 April 2026</span>
          <Link href="/cookies" className="text-rose hover:underline">
            View UK Version (/cookies) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Cookie Policy &amp; Storage Architecture (US)
        </h1>
        <p className="text-base text-graphite-muted font-light leading-relaxed">
          At Avorria, performance engineering and privacy engineering are inseparable. We reject invasive tracking banners and third-party script bloat by architectural design.
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base font-light text-graphite leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">1. Zero Third-Party Advertising Cookies</h2>
          <p>
            Avorria does <strong>not</strong> sell or share personal information for behavioral advertising. We deploy zero marketing tracking pixels, cross-app ad trackers, or surveillance scripts across our public platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">2. Essential Technical Identifiers</h2>
          <p>
            Our US endpoints deploy only strictly necessary technical identifiers required for cloud edge routing and Cloudflare Turnstile bot deterrence.
          </p>

          <div className="border border-graphite-hairline bg-ivory overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-ivory-subtle border-b border-graphite-hairline">
                <tr>
                  <th className="p-3 font-medium text-graphite">Identifier</th>
                  <th className="p-3 font-medium text-graphite">Provider</th>
                  <th className="p-3 font-medium text-graphite">Purpose</th>
                  <th className="p-3 font-medium text-graphite">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-hairline text-graphite-muted">
                <tr>
                  <td className="p-3 text-graphite">cf_clearance</td>
                  <td className="p-3">Cloudflare</td>
                  <td className="p-3 font-sans text-xs">Edge security validation token.</td>
                  <td className="p-3">Session / 1 Year</td>
                </tr>
                <tr>
                  <td className="p-3 text-graphite">__cf_bm</td>
                  <td className="p-3">Cloudflare</td>
                  <td className="p-3 font-sans text-xs">Turnstile risk token to prevent credential stuffing.</td>
                  <td className="p-3">30 Minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">3. Global Privacy Control (GPC)</h2>
          <p>
            Because we do not engage in the sale or sharing of personal data, no opt-out mechanisms are required under CCPA/CPRA. We naturally respect Global Privacy Control (GPC) signals by delivering zero tracking code to any browser.
          </p>
        </section>
      </div>

      <footer className="pt-8 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
        <Link href="/us/privacy" className="text-graphite hover:text-rose">
          US Privacy Policy &rarr;
        </Link>
        <Link href="/us/terms" className="text-graphite hover:text-rose">
          US Terms of Service &rarr;
        </Link>
      </footer>
    </div>
  );
}
