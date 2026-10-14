import type { CaseStudy } from "../schema";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-uk-institutional-finance",
    slug: "uk-institutional-finance-platform",
    title: "Institutional Wealth & Reporting Platform",
    clientSector: "Asset Management & Private Banking",
    jurisdiction: "United Kingdom",
    status: "Under Non-Disclosure Agreement",
    challenge:
      "Legacy monolithic portal burdened with 3.8s mobile LCP, severe layout shifts during real-time balance calculations, and failing accessibility compliance across complex multi-currency reporting tables.",
    architecture:
      "Engineered decoupled Next.js App Router front-end with streaming Server Components, optimistic UI cache updates, and strict 100% WCAG 2.2 AA compliant tabular navigation with zero third-party tracking scripts.",
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
    clientSector: "Enterprise Legal & Regulatory Compliance",
    jurisdiction: "United States",
    status: "Under Non-Disclosure Agreement",
    challenge:
      "Enterprise compliance team required automated multi-jurisdictional contract extraction with zero hallucinations, strict schema validation, and complete audit logging across thousands of statutory filings.",
    architecture:
      "Built deterministic multi-agent state machines with dual-layer schema verification (Zod/TypeScript), private vector embeddings, and an asynchronous human-in-the-loop review workflow.",
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
