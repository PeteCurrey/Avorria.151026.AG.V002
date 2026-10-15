import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Cookie Policy | Strict Zero-Tracking Architecture",
  description:
    "Avorria&apos;s architectural commitment to privacy: Zero third-party marketing cookies, zero retargeting pixels, and minimal essential session tokens.",
  path: "/cookies",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" },
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
          Complies with the UK Privacy and Electronic Communications Regulations (PECR) and EU ePrivacy Directive standards.
        </p>
      </div>

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted">
          <span>Effective Date: 15 April 2026</span>
          <Link href="/us/cookies" className="text-rose hover:underline">
            View US Version (/us/cookies) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Cookie Policy &amp; Storage Architecture
        </h1>
        <p className="text-base text-graphite-muted font-light leading-relaxed">
          At Avorria, performance engineering and privacy engineering are inseparable. We reject invasive tracking banners and third-party script bloat by architectural design.
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base font-light text-graphite leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">1. The Zero-Tracking Invariant</h2>
          <p>
            Avorria does <strong>not</strong> use advertising cookies, marketing pixels, social media widgets, or behavioural profiling scripts anywhere on <code>avorria.com</code>.
          </p>
          <p>
            Because we do not store non-essential cookies, we do not subject users to obstructive consent popups or consent management platform (CMP) script waterfalls that degrade Largest Contentful Paint (LCP) and battery life.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">2. Essential Technical Cookies &amp; Local Storage</h2>
          <p>
            Our platform utilizes only strictly necessary technical identifiers required for security and core functionality:
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
                  <td className="p-3 font-sans text-xs">Bot defense and DDoS protection validation token.</td>
                  <td className="p-3">Session / 1 Year</td>
                </tr>
                <tr>
                  <td className="p-3 text-graphite">__cf_bm</td>
                  <td className="p-3">Cloudflare</td>
                  <td className="p-3 font-sans text-xs">Turnstile challenge risk assessment to detect automated bot networks.</td>
                  <td className="p-3">30 Minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">3. Managing and Disabling Cookies</h2>
          <p>
            You may configure your web browser to reject all cookies or notify you when a cookie is placed. Note that blocking Cloudflare security tokens may prevent successful submission of executive mandate inquiries through <code>/contact</code>.
          </p>
        </section>
      </div>

      <footer className="pt-8 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
        <Link href="/privacy" className="text-graphite hover:text-rose">
          Privacy Policy &rarr;
        </Link>
        <Link href="/terms" className="text-graphite hover:text-rose">
          Terms of Business &rarr;
        </Link>
      </footer>
    </div>
  );
}
