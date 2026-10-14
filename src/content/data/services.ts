import type { Service } from "../schema";

export const SERVICES: Service[] = [
  {
    id: "srv-nextjs-platforms",
    slug: "nextjs-platforms",
    code: "SRV-01",
    title: "High-Performance Web Platforms",
    category: "Web Platforms",
    summary:
      "Enterprise Next.js App Router and Vite architectures engineered for deterministic sub-second LCP, zero layout shifts, and resilience at scale.",
    headline:
      "Decoupled, edge-optimized front-end platforms eliminating runtime overhead for institutional web applications.",
    description:
      "Avorria engineers mission-critical web applications for corporate clients in the UK and USA. Leveraging Next.js App Router, React 19 Server Components, and Vite toolchains, our architectures enforce strict bundle budgets, hybrid caching topologies, and sub-2.0s Largest Contentful Paint guarantees under throttled network conditions.",
    deliverables: [
      "Next.js App Router architectures with streaming Server Components & edge SSR",
      "Vite & React 19 decoupled front-end applications with granular tree-shaking",
      "Lenis and GSAP interaction systems constrained to transform and opacity animations",
      "Sub-2.0s LCP, INP < 150ms, and CLS < 0.02 Core Web Vitals contractual SLAs",
    ],
    techStack: ["Next.js", "React 19", "Vite", "TypeScript Strict", "Tailwind CSS", "GSAP", "Lenis"],
    architectureFocus: "Edge Rendering, Hybrid Caching, Asset Budgets, Hydration Minimization",
    pricingGuidance: {
      currency: "GBP",
      range: "£45,000 - £180,000",
      engagementModel: "Fixed-Milestone Sprint Architecture",
    },
  },
  {
    id: "srv-enterprise-ai",
    slug: "enterprise-ai",
    code: "SRV-02",
    title: "Enterprise AI Systems & Agentic Orchestration",
    category: "AI Systems",
    summary:
      "Production-hardened, deterministic AI agent workflows and low-latency inference pipelines with rigorous schema boundaries.",
    headline:
      "Moving beyond generative novelty to deliver auditable, deterministic AI systems integrated into corporate operations.",
    description:
      "We design and build deterministic multi-agent systems, structured schema-validated LLM pipelines, and low-latency retrieval architectures. Our implementations feature formal state-machine controls, vector similarity caching, and strict prompt evaluation suites designed to satisfy regulatory and corporate governance mandates.",
    deliverables: [
      "Deterministic multi-agent workflows with state-machine governance and rollback",
      "Domain-specific Retrieval-Augmented Generation (RAG) with vector similarity caching",
      "Strict schema enforcement and runtime validation utilizing Zod and TypeScript",
      "Private API integration, automated evaluation suites, and inference latency telemetry",
    ],
    techStack: ["Node LTS", "TypeScript", "Python", "Supabase Vector", "OpenAI / Anthropic APIs", "Zod"],
    architectureFocus: "Deterministic Tool Calling, Vector Similarity Caching, Guardrails, Latency Budgets",
    pricingGuidance: {
      currency: "GBP",
      range: "£60,000 - £240,000",
      engagementModel: "Phased Architecture & Production Deployment",
    },
  },
  {
    id: "srv-performance-audits",
    slug: "performance-audits",
    code: "SRV-03",
    title: "Performance Audits & Architecture Modernization",
    category: "Performance Engineering",
    summary:
      "Rigorous diagnostic analysis and surgical refactoring for high-value web applications with declining Core Web Vitals.",
    headline:
      "Code-level deconstruction, third-party script isolation, and WCAG 2.2 AA accessibility remediation.",
    description:
      "For enterprise applications suffering from hydration bloat, slow time-to-interactive, and deteriorating search visibility, Avorria conducts thorough code-level audits. We refactor monolithic single-page applications into lean, high-velocity platforms with continuous automated performance gating.",
    deliverables: [
      "Comprehensive Core Web Vitals remediation (LCP, INP, CLS)",
      "Legacy React/Webpack SPA to Next.js / Vite migration blueprint and execution",
      "Full WCAG 2.2 AA accessibility audit, screen-reader testing, and keyboard navigation hardening",
      "Bundle size deconstruction and third-party script isolation via Web Workers",
    ],
    techStack: ["Chrome DevTools", "WebPageTest", "Lighthouse CI", "Next.js Analyzer", "TypeScript"],
    architectureFocus: "Critical Path Profiling, Script Elimination, Font Subsetting, A11y Semantics",
    pricingGuidance: {
      currency: "GBP",
      range: "£25,000 - £75,000",
      engagementModel: "Diagnostic Audit & Surgical Remediation Sprint",
    },
  },
];
