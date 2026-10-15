import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { HeroSection } from "@/components/home/HeroSection";
import { LazySignature3D } from "@/components/scene/LazySignature3D";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { PerformanceProofSection } from "@/components/home/PerformanceProofSection";
import { SelectedWorkSection } from "@/components/home/SelectedWorkSection";
import { ApproachSection } from "@/components/home/ApproachSection";
import { InternationalSection } from "@/components/home/InternationalSection";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata = constructMetadata({
  title: "Performance-First Web Platforms & AI Systems",
  description:
    "Avorria architects bespoke performance-first Next.js, Vite, and React web platforms and production AI systems for enterprise clients in the UK and USA.",
  path: "/",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function HomePage() {
  return (
    <div className="w-full bg-ivory text-graphite overflow-hidden">
      {/* 1. Hero: Ivory, Huge Headline, 1-Line Copy, 2 CTAs, Masked Line Reveal, UK/US Local Times */}
      <HeroSection />

      {/* 2. Signature 3D Sequence: Layered architectural slabs assembling on ScrollTrigger scrub */}
      <LazySignature3D />

      {/* 3. Capabilities: HoverReveal row list with mask preview and service page outcomes */}
      <CapabilitiesSection />

      {/* 4. Proof: Live performance panel with real browser CWV/telemetry and explicit measuring state */}
      <PerformanceProofSection />

      {/* 5. Selected Work: Horizontal pinned scroll of case-study cards with parallax and clearly marked slot 3 */}
      <SelectedWorkSection />

      {/* 6. Approach: Pinned, scrubbed 3-step sequence with large numerals */}
      <ApproachSection />

      {/* 7. International: UK & US offices, live clocks, cross-timezone synchronous engagement */}
      <InternationalSection />

      {/* 8. CTA: Direct mandate transmission leading into the global footer */}
      <CtaSection />
    </div>
  );
}
