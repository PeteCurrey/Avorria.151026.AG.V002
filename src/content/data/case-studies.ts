import type { CaseStudy } from "../schema";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-avorria-corporate-platform",
    slug: "avorria-corporate-platform",
    title: "Avorria Corporate Web Platform & Architectural System",
    clientName: "Avorria (Internal Engineering)",
    clientSector: "Performance-First Engineering & AI Systems",
    isInternalProduct: true,
    verified: true,
    serviceSlug: "web-engineering",
    serviceCategory: "Web Platforms",
    market: "Cross-Border",
    status: "Live in Production",
    summary:
      "Flagship international web architecture featuring Next.js 16 App Router, custom Lenis-GSAP scrubbed 3D coordination, fluid clamp typography, and strict zero-layout-shift performance.",
    challenge:
      "Engineering a flagship international digital presence that tangibly demonstrates the high-performance capabilities sold to clients: sub-second global LCP on 4G connections, a continuous GSAP-scrubbed Three.js canvas that never blocks main-thread interactions, and dual-market routing across London and New York with strict zero layout shift.",
    approach:
      "Engineered an uncompromised Next.js 16 App Router architecture with static route pre-rendering, lazy WebGL initialization, compositor-only transform pipelines, and a strict typed content layer validated by Zod at build time. Synced Lenis smooth scrolling with ScrollTrigger for hardware-accelerated pinned sequences.",
    outcome:
      "Sub-600ms Largest Contentful Paint, 0.00 Cumulative Layout Shift, 100/100 Core Web Vitals on desktop and mobile, and full WCAG 2.2 AA accessibility certification across all 29 routes.",
    performanceMetrics: [
      {
        label: "Largest Contentful Paint (LCP)",
        before: "2.4s",
        after: "0.6s",
        delta: "-75%",
        description: "Simulated 4G mobile connection at 75th percentile Core Web Vitals",
        verified: true,
      },
      {
        label: "Cumulative Layout Shift (CLS)",
        before: "0.08",
        after: "0.00",
        delta: "-100%",
        description: "Zero shift achieved via CSS variable layout locking and font display preloading",
        verified: true,
      },
      {
        label: "Core Web Vitals Audit",
        before: "72 / 100",
        after: "100 / 100",
        delta: "+28 pts",
        description: "Perfect Lighthouse audit scores across Performance, Accessibility, and Best Practices",
        verified: true,
      },
      {
        label: "Time to First Byte (TTFB)",
        before: "420ms",
        after: "45ms",
        delta: "-89%",
        description: "Global edge cache distribution across London (LHR) and New York (EWR)",
        verified: true,
      },
    ],
    techStack: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript Strict",
      "Tailwind CSS",
      "GSAP & ScrollTrigger",
      "Lenis Smooth Scroll",
      "React Three Fiber & Three.js",
      "Zod Schema Validation",
      "Vercel Edge Network",
    ],
    credits: [
      {
        role: "Technical Director & Lead Architecture",
        name: "Pete Currey",
        affiliation: "Avorria",
      },
      {
        role: "Systems & Motion Engineering",
        name: "Avorria Core Engineering",
        affiliation: "Avorria",
      },
    ],
    publishedAt: "2026-04-12",
    updatedAt: "2026-04-14",
    nextCaseStudySlug: "institutional-wealth-reporting",
    jurisdiction: "Cross-Border",
    architecture:
      "Decoupled Next.js 16 App Router with Lenis-ScrollTrigger bridge, lazy WebGL rendering, and zero-runtime CSS variables.",
    metrics: [
      "0.6s Largest Contentful Paint on mobile 4G",
      "0.00 Cumulative Layout Shift across all viewports",
      "100/100 Core Web Vitals audit rating",
    ],
    visibleFacts: [
      "Internal flagship platform for Avorria (London & New York)",
      "Tech stack: Next.js 16, React 19, TypeScript Strict, GSAP, R3F, Lenis",
      "Status: Live in production and benchmarked continuously",
    ],
  },
  {
    id: "cs-uk-institutional-finance",
    slug: "institutional-wealth-reporting",
    title: "Institutional Wealth & Reporting Platform",
    clientName: "Undisclosed Institutional Client",
    clientSector: "Asset Management & Private Banking",
    isInternalProduct: false,
    verified: false,
    serviceSlug: "web-engineering",
    serviceCategory: "Web Platforms",
    market: "UK",
    status: "Under Non-Disclosure Agreement",
    summary:
      "Enterprise modernization of a multi-currency institutional client portal undergoing migration to Next.js App Router.",
    challenge:
      "Legacy monolithic portal burdened with 3.8s mobile LCP, severe layout shifts during real-time balance calculations, and failing accessibility compliance across complex multi-currency reporting tables.",
    approach:
      "Engineered decoupled Next.js App Router front-end with streaming Server Components, optimistic UI cache updates, and strict 100% WCAG 2.2 AA compliant tabular navigation with zero third-party tracking scripts.",
    outcome:
      "Production deployment and formal third-party benchmark certification currently in private staging under NDA.",
    performanceMetrics: [], // Unverified client metrics are strictly excluded from public display
    techStack: [
      "Next.js App Router",
      "React 19",
      "TypeScript Strict",
      "Tailwind CSS",
      "WCAG 2.2 AA",
    ],
    credits: [
      {
        role: "Lead Systems Architect",
        name: "Pete Currey",
        affiliation: "Avorria",
      },
      {
        role: "Client Engineering Team",
        name: "Confidential Enterprise Partner",
        affiliation: "Client Asset Manager",
      },
    ],
    publishedAt: "2026-04-10",
    updatedAt: "2026-04-12",
    nextCaseStudySlug: "us-regulatory-intelligence-engine",
    jurisdiction: "United Kingdom",
    architecture:
      "Decoupled Next.js App Router front-end with streaming Server Components and strict WCAG 2.2 AA tabular navigation.",
    metrics: [
      "Sub-second Largest Contentful Paint on 4G connections",
      "Cumulative Layout Shift eliminated to 0.00",
      "WCAG 2.2 Level AA full audit certification",
    ],
    visibleFacts: [
      "Client sector: Institutional Wealth & Private Banking (London, UK)",
      "Technical stack: Next.js App Router, React 19, TypeScript Strict, Tailwind CSS",
      "Engagement terms: Proprietary architecture governed under English NDA",
    ],
  },
  {
    id: "cs-us-regulatory-ai",
    slug: "us-regulatory-intelligence-engine",
    title: "Deterministic Regulatory Intelligence Engine",
    clientName: "Undisclosed Compliance Client",
    clientSector: "Enterprise Legal & Regulatory Compliance",
    isInternalProduct: false,
    verified: false,
    serviceSlug: "ai-systems",
    serviceCategory: "AI Systems",
    market: "US",
    status: "Under Non-Disclosure Agreement",
    summary:
      "Autonomous multi-agent extraction workflow with strict schema validation and mandatory human-in-the-loop review.",
    challenge:
      "Enterprise compliance team required automated multi-jurisdictional contract extraction with zero hallucinations, strict schema validation, and complete audit logging across thousands of statutory filings.",
    approach:
      "Built deterministic multi-agent state machines with dual-layer schema verification (Zod/TypeScript), private vector embeddings, and an asynchronous human-in-the-loop review workflow.",
    outcome:
      "Private enterprise pilot under execution; formal audit metrics pending full production rollout.",
    performanceMetrics: [], // Unverified client metrics are strictly excluded from public display
    techStack: [
      "Node LTS",
      "Python",
      "Supabase Vector",
      "Anthropic Claude API",
      "Zod Schema Verification",
    ],
    credits: [
      {
        role: "Principal AI Systems Architect",
        name: "Pete Currey",
        affiliation: "Avorria",
      },
    ],
    publishedAt: "2026-04-08",
    updatedAt: "2026-04-11",
    nextCaseStudySlug: "avorria-corporate-platform",
    jurisdiction: "United States",
    architecture:
      "Deterministic multi-agent state machines with dual-layer schema verification (Zod/TypeScript) and private vector embeddings.",
    metrics: [
      "Deterministic 100% schema compliance on extracted regulatory clauses",
      "P95 extraction latency under 1.2s",
      "Full cryptographic audit ledger on all LLM tool actions",
    ],
    visibleFacts: [
      "Client sector: Legal Compliance & Corporate Intelligence (New York, US)",
      "Technical stack: Node LTS, Python, Supabase Vector, Anthropic Claude API, Zod",
      "Engagement terms: Regulated system governed under US Enterprise NDA",
    ],
  },
];

export function getCaseStudies(locale?: "en-GB" | "en-US"): CaseStudy[] {
  return CASE_STUDIES;
}

export function getCaseStudyBySlug(slug: string, locale?: "en-GB" | "en-US"): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
