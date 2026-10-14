export interface CapabilityItem {
  id: string;
  code: string;
  title: string;
  category: "Web Platforms" | "AI Systems" | "Performance Engineering";
  headline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  architectureFocus: string;
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "performance-web-platforms",
    code: "CAP-01",
    title: "High-Performance Web Platforms",
    category: "Web Platforms",
    headline: "Engineered for deterministic sub-second LCP, zero layout shifts, and resilience at scale.",
    description:
      "Avorria architects and deploys bespoke web applications using modern Next.js App Router, React 19 Server Components, and Vite toolchains. Every architecture is decoupled, statically optimized where possible, and dynamically computed at the edge to satisfy demanding performance budgets without runtime bloat.",
    deliverables: [
      "Custom Next.js App Router architectures with Server Components & edge SSR",
      "Vite & React 19 front-end platforms with granular tree-shaking",
      "Dynamic GSAP & Lenis smooth interaction layers designed without layout-thrashing",
      "Zero-layout-shift (CLS < 0.02) and sub-2.0s Largest Contentful Paint guarantees",
    ],
    techStack: ["Next.js", "React 19", "Vite", "TypeScript", "Tailwind CSS", "GSAP", "Lenis"],
    architectureFocus: "Edge Rendering, Hybrid Caching, Asset Budgets, Hydration Minimization",
  },
  {
    id: "autonomous-ai-systems",
    code: "CAP-02",
    title: "Enterprise AI Systems & Orchestration",
    category: "AI Systems",
    headline: "Production-grade, deterministic AI agent workflows and low-latency inference pipelines.",
    description:
      "Beyond exploratory prototypes, Avorria delivers production-hardened AI integrations. We build deterministic multi-agent state machines, structured schema-validated LLM pipelines, and low-latency retrieval systems that integrate directly into corporate operations across the UK and USA.",
    deliverables: [
      "Deterministic multi-agent workflows with state-machine governance",
      "Domain-specific Retrieval-Augmented Generation (RAG) systems",
      "Structured output enforcement with runtime schema validation",
      "Private API integration, prompt evaluation suites, and latency monitoring",
    ],
    techStack: ["Node LTS", "TypeScript", "Python", "Supabase Vector", "OpenAI / Anthropic APIs", "Zod"],
    architectureFocus: "Deterministic Tool Calling, Vector Similarity Caching, Guardrails, Latency Budgets",
  },
  {
    id: "critical-performance-auditing",
    code: "CAP-03",
    title: "Performance Audits & Modernization",
    category: "Performance Engineering",
    headline: "Rigorous diagnostic analysis and code-level refactoring for mission-critical web applications.",
    description:
      "We perform deep architectural audits for enterprises burdened by slow single-page applications, hydration overhead, and declining Core Web Vitals. We refactor monolithic front-ends into lean, type-safe platforms with strict automated performance budgets.",
    deliverables: [
      "Core Web Vitals remediation (LCP < 2.0s, INP < 150ms, CLS < 0.02)",
      "Legacy React/Webpack to Next.js / Vite migration strategy and execution",
      "WCAG 2.2 AA accessibility remediation and keyboard navigation audits",
      "Bundle size deconstruction and third-party script isolation",
    ],
    techStack: ["Chrome DevTools", "WebPageTest", "Lighthouse CI", "Next.js Analyzer", "TypeScript"],
    architectureFocus: "Critical Path Profiling, Script Elimination, Font Subsetting, A11y Semantics",
  },
];

export interface EngagementSlot {
  id: string;
  type: "Client Engagement Slot" | "Case Study Slot";
  status: "Available for Engagement" | "Under Non-Disclosure Agreement";
  sector: string;
  jurisdiction: "United Kingdom" | "United States" | "Cross-Border";
  scopeSummary: string;
}

export const ENGAGEMENT_SLOTS: EngagementSlot[] = [
  {
    id: "slot-uk-fintech",
    type: "Case Study Slot",
    status: "Under Non-Disclosure Agreement",
    sector: "Institutional Finance / Asset Management",
    jurisdiction: "United Kingdom",
    scopeSummary: "Full rewrite of core client portal into Next.js App Router with real-time audit ledger.",
  },
  {
    id: "slot-us-enterprise-ai",
    type: "Case Study Slot",
    status: "Under Non-Disclosure Agreement",
    sector: "Enterprise Legal & Regulatory Intelligence",
    jurisdiction: "United States",
    scopeSummary: "Deterministic agentic search and automated cross-jurisdictional contract extraction pipeline.",
  },
  {
    id: "slot-q4-inquiry",
    type: "Client Engagement Slot",
    status: "Available for Engagement",
    sector: "Technology / Corporate Enterprise",
    jurisdiction: "Cross-Border",
    scopeSummary: "Direct executive engagement allocation for upcoming quarterly delivery cycle.",
  },
];
