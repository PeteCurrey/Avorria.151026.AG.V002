import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = constructMetadata({
  title: "Accessibility Statement | WCAG 2.2 AA Conformance",
  description:
    "Avorria&apos;s architectural commitment to universal accessibility: WCAG 2.2 Level AA standards, reduced-motion fallbacks, and screen reader compatibility.",
  path: "/accessibility",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Accessibility Statement", path: "/accessibility" },
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
          Evaluated against the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA, UK Equality Act 2010, and Americans with Disabilities Act (ADA) Title III principles.
        </p>
      </div>

      <header className="space-y-4 border-b border-graphite-hairline pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-graphite-muted">
          <span>Last Audited: 15 April 2026</span>
          <Link href="/us/accessibility" className="text-rose hover:underline">
            View US Version (/us/accessibility) &rarr;
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extralight text-graphite tracking-tighter-display">
          Accessibility Statement
        </h1>
        <p className="text-base text-graphite-muted font-light leading-relaxed">
          Avorria is committed to digital inclusivity. We engineer our design system, motion primitives, and component trees to ensure equal access for all users, including those using assistive technologies.
        </p>
      </header>

      <div className="space-y-10 text-sm sm:text-base font-light text-graphite leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">1. Conformance Standard</h2>
          <p>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. Avorria targets <strong>WCAG 2.2 Level AA</strong> conformance across all public templates on <code>avorria.com</code>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">2. Technical Measures &amp; Engineering Controls</h2>
          <p>
            Our codebase implements the following programmatic accessibility controls:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-graphite-muted">
            <li>
              <strong>Perceivable Color Contrast:</strong> All text and interactive elements satisfy a minimum contrast ratio of 4.5:1 against their backgrounds (graphite <code>#141517</code> on ivory <code>#FAF8F5</code> achieves &gt; 16:1 contrast).
            </li>
            <li>
              <strong>Keyboard Operability:</strong> Every interactive component — including our full-screen editorial navigation overlay, form inputs, and article filters — is fully navigable via standard keyboard controls (Tab, Shift+Tab, Enter, Space, Escape).
            </li>
            <li>
              <strong>Focus Management:</strong> Visible focus rings (rose <code>#A33A4B</code> outline with offset) are rendered on active elements. Focus traps prevent focus loss when dialog overlays are open.
            </li>
            <li>
              <strong>Reduced Motion Respect:</strong> Our GSAP and Three.js motion engines actively query <code>window.matchMedia(&quot;(prefers-reduced-motion: reduce)&quot;)</code>. When enabled, parallax scrubbing, 3D rotations, and staggered animations are immediately suppressed or replaced with instantaneous transitions.
            </li>
            <li>
              <strong>Screen Reader Compatibility:</strong> Form fields feature programmatic label associations (<code>htmlFor</code> / <code>id</code>), explicit ARIA invalid states (<code>aria-invalid</code>), and real-time status announcements (<code>aria-live</code>).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">3. Continuous Testing Methodology</h2>
          <p>
            Our accessibility posture is maintained through:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-graphite-muted">
            <li>Automated Axe Core and Lighthouse accessibility audits integrated into CI pipelines.</li>
            <li>Manual keyboard-only tab navigation audits across macOS and Windows browsers.</li>
            <li>Screen reader smoke testing utilizing Apple VoiceOver on Safari.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-normal text-graphite">4. Feedback &amp; Remediation Channel</h2>
          <p>
            If you encounter any accessibility barrier or require an alternative format of our research publications, please contact our lead engineering team directly at:
          </p>
          <div className="p-4 border border-graphite-hairline bg-ivory text-xs font-mono space-y-1 text-graphite-muted">
            <p className="text-graphite font-normal">Accessibility Remediation Office</p>
            <p>Direct Email: <a href="mailto:accessibility@avorria.com" className="text-rose hover:underline">accessibility@avorria.com</a></p>
            <p>Response Expectation: Within 2 business days</p>
          </div>
        </section>
      </div>

      <footer className="pt-8 border-t border-graphite-hairline flex items-center justify-between text-xs font-mono">
        <Link href="/terms" className="text-graphite hover:text-rose">
          Terms of Business &rarr;
        </Link>
        <Link href="/contact" className="text-graphite hover:text-rose">
          Contact Leadership &rarr;
        </Link>
      </footer>
    </div>
  );
}
