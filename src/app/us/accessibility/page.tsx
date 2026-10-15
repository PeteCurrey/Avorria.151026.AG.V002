import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Accessibility Statement | WCAG 2.2 AA Conformance (US)",
  description:
    "Avorria&apos;s architectural commitment to universal accessibility: WCAG 2.2 Level AA standards, reduced-motion fallbacks, and ADA Title III compliance.",
  path: "/us/accessibility",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsAccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "US Home", path: "/us" },
          { name: "Accessibility Statement", path: "/us/accessibility" },
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
          Evaluated against the Americans with Disabilities Act (ADA) Title III, Section 508 of the Rehabilitation Act, and WCAG 2.2 Level AA guidelines.
        </p>
      </div>

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted">
          <span>Last Audited: 15 April 2026</span>
          <Link href="/accessibility" className="text-rose hover:underline">
            View UK Version (/accessibility) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Accessibility Statement (North America)
        </h1>
        <p className="text-base text-graphite-muted font-light leading-relaxed">
          Avorria is committed to digital inclusivity. We engineer our design system, motion primitives, and component trees to ensure equal access for all users, including those using assistive technologies.
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base font-light text-graphite leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">1. Standards Baseline</h2>
          <p>
            Avorria designs and tests our digital interfaces to align with <strong>WCAG 2.2 Level AA</strong> standards, Section 508 accessibility guidelines, and ADA Title III web accessibility principles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">2. Built-in Accessibility Architecture</h2>
          <p>
            Our core technical infrastructure guarantees:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-graphite-muted">
            <li>High-contrast visual hierarchy (&gt; 16:1 text-to-background contrast on primary reading canvases).</li>
            <li>Comprehensive keyboard navigation with visible rose focus indicators on all interactive surfaces.</li>
            <li>Native operating system reduced-motion preference query (<code>prefers-reduced-motion</code>) suppressing intensive canvas and GSAP transitions.</li>
            <li>Accessible landmark markup (<code>main</code>, <code>nav</code>, <code>header</code>, <code>footer</code>, <code>aside</code>) and labeled form inputs.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">3. North American Inquiries &amp; Accommodations</h2>
          <p>
            For accessibility accommodations or feedback concerning our North American web presence, contact our remediation office at:
          </p>
          <div className="p-4 border border-graphite-hairline bg-ivory text-xs font-mono space-y-1 text-graphite-muted">
            <p className="text-graphite font-normal">Accessibility Remediation Office (North America)</p>
            <p>One World Trade Center, Floor 85, New York, NY 10007</p>
            <p>Email: <a href="mailto:accessibility@avorria.com" className="text-rose hover:underline">accessibility@avorria.com</a></p>
          </div>
        </section>
      </div>

      <footer className="pt-8 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
        <Link href="/us/terms" className="text-graphite hover:text-rose">
          US Terms of Service &rarr;
        </Link>
        <Link href="/us/contact" className="text-graphite hover:text-rose">
          Contact Leadership &rarr;
        </Link>
      </footer>
    </div>
  );
}
