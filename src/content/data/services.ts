import type { Service } from "../schema";

export const SERVICES: Service[] = [
  {
    id: "srv-web-engineering",
    slug: "web-engineering",
    code: "SRV-01",
    title: "Web Engineering (Next.js, Vite, React)",
    category: "Web Platforms",
    summary:
      "Enterprise Next.js 16 App Router and Vite architectures engineered for contractual sub-2.0s Largest Contentful Paint, zero layout shifts, and decoupled edge resilience.",
    headline:
      "Decoupled, edge-optimized front-end platforms eliminating hydration overhead for institutional web applications.",
    description:
      "Avorria engineers mission-critical web platforms for corporate clients in the UK and USA. Leveraging Next.js App Router, React 19 Server Components, and Vite toolchains, our architectures enforce strict bundle budgets, hybrid caching topologies, and contractual sub-2.0s Largest Contentful Paint guarantees on throttled mobile connections. We eliminate runtime hydration debt by shifting rendering computation to the server and CDN edge.",
    deliverables: [
      "Next.js App Router architectures with streaming React Server Components (RSC)",
      "Decoupled Vite & React 19 micro-frontends with granular ESM tree-shaking",
      "Hardware-accelerated GSAP & Lenis interaction systems constrained to compositor properties",
      "Contractual Core Web Vitals SLAs: LCP < 2.0s, INP < 150ms, and CLS < 0.02 on mobile",
      "Edge middleware for geolocation-based routing, international hreflang, and security headers",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "Vite",
      "TypeScript Strict",
      "Tailwind CSS",
      "GSAP",
      "Lenis",
      "Node LTS",
    ],
    architectureFocus: "Edge Rendering, Hybrid Caching, Asset Budgets, Hydration Minimisation",
    pricingGuidance: {
      currency: "GBP",
      range: "£45,000 - £180,000",
      engagementModel: "Fixed-Milestone Sprint Architecture",
    },
    outcomeStatement:
      "We replace bloated legacy single-page apps with decoupled Next.js 16 and Vite architectures guaranteed to load under 2.0 seconds on mobile cellular networks.",
    deliveryPhases: [
      {
        num: "01",
        title: "Specification & Schema Architecture",
        description:
          "Before generating UI code, every data boundary, API payload, and routing state is modeled in strict TypeScript and Zod schemas. We establish contractually binding Core Web Vitals thresholds.",
        deliverables: [
          "Complete Zod schema boundary definitions",
          "Routing and edge caching topology specification",
          "Contractual Core Web Vitals SLA baseline",
        ],
      },
      {
        num: "02",
        title: "Decoupled Server Component Build",
        description:
          "Implementation utilizing React 19 Server Components to eliminate hydration overhead. Client-side JavaScript is confined to isolated interactive islands.",
        deliverables: [
          "Streaming server-rendered page layouts",
          "Edge-cached static asset optimization",
          "Zero-layout-shift UI component library",
        ],
      },
      {
        num: "03",
        title: "Compositor-Layer Motion Engineering",
        description:
          "Integration of GSAP ScrollTrigger and Lenis smooth scrolling. All animations are strictly constrained to CSS transform and opacity to maintain 60fps frame rates.",
        deliverables: [
          "Hardware-accelerated scroll scrub sequences",
          "Accessible reduced-motion media query fallbacks",
          "Memory-leak-free lifecycle teardowns",
        ],
      },
      {
        num: "04",
        title: "Empirical SLA Hardening & Release",
        description:
          "Automated CI quality gating verifying Lighthouse scores, axe-core accessibility compliance, and real-user monitoring telemetry prior to production cutover.",
        deliverables: [
          "Automated CI bundle budget enforcement (< 80KB critical JS)",
          "100% WCAG 2.2 Level AA accessibility certification",
          "Dual-jurisdiction edge deployment across UK and US nodes",
        ],
      },
    ],
    techStackCategorized: [
      {
        category: "Framework & Core Runtime",
        items: [
          {
            name: "Next.js 16 (App Router)",
            rationale: "Streaming Server Components, edge SSR, and automated code-splitting.",
          },
          {
            name: "React 19",
            rationale: "Action hooks, server functions, and zero hydration tax on static content.",
          },
          {
            name: "Vite",
            rationale: "Ultra-fast ESM development toolchain for decoupled internal applications.",
          },
        ],
      },
      {
        category: "Type Safety & Validation",
        items: [
          {
            name: "TypeScript (Strict Mode)",
            rationale: "Complete type safety with noImplicitAny and strictNullChecks enabled.",
          },
          {
            name: "Zod",
            rationale: "Build-time and runtime validation ensuring external data adheres to contract.",
          },
        ],
      },
      {
        category: "Motion & Styling",
        items: [
          {
            name: "Tailwind CSS",
            rationale: "Utility-first CSS compiled to minimal atomic stylesheets with zero runtime.",
          },
          {
            name: "GSAP & ScrollTrigger",
            rationale: "Frame-locked scroll scrubbing constrained to GPU-accelerated properties.",
          },
          {
            name: "Lenis",
            rationale: "Lightweight smooth scrolling synchronized with ScrollTrigger ticks.",
          },
        ],
      },
    ],
    engagementDetails: {
      process:
        "Structured into 2-week architectural sprints. Each milestone culminates in empirical performance telemetry verification and functional artifact demonstration under mutual NDA.",
      teamComposition: [
        "Partner Lead & System Architect",
        "Staff Front-End Engineer",
        "Performance & A11y Specialist",
      ],
      timelineRange: "8–14 weeks",
      timelineConfirmation: "Timeline verified for Q3 2026 delivery window by Pete Currey.",
      commercialModel: "Fixed-Price Milestone Contract or Dedicated Engineering Sprint Retainer",
    },
    relatedCaseStudySlugs: ["uk-institutional-finance-platform"],
    relatedLobbySlugs: ["engineering-the-sub-second-web"],
  },
  {
    id: "srv-ai-systems",
    slug: "ai-systems",
    code: "SRV-02",
    title: "Enterprise AI Systems",
    category: "AI Systems",
    summary:
      "Production-hardened, deterministic AI agent workflows, retrieval-augmented systems, and automated internal tools with strict schema boundaries and human-in-the-loop oversight.",
    headline:
      "Moving beyond generative novelty to deliver auditable, deterministic AI systems integrated into corporate operations.",
    description:
      "Avorria engineers deterministic multi-agent state machines, structured schema-validated LLM pipelines, and low-latency retrieval architectures. Our implementations feature formal state-machine controls, vector similarity caching, and strict prompt evaluation suites designed to satisfy regulatory and corporate governance mandates. We reject ungrounded autonomous agents in favour of auditable pipelines with mandatory human checkpoints.",
    deliverables: [
      "Deterministic multi-agent workflows with state-machine governance and rollback capabilities",
      "Domain-specific Retrieval-Augmented Generation (RAG) with vector similarity caching",
      "Structured output enforcement and runtime validation utilizing Zod and TypeScript",
      "Cryptographic audit logging on all autonomous agent tool executions and model inferences",
      "Human-in-the-loop review interfaces for exceptional or high-risk decision paths",
    ],
    techStack: [
      "Node LTS",
      "TypeScript",
      "Python",
      "Supabase Vector",
      "Anthropic Claude API",
      "OpenAI API",
      "Zod",
    ],
    architectureFocus: "Deterministic Tool Calling, Vector Similarity Caching, Guardrails, Latency Budgets",
    pricingGuidance: {
      currency: "GBP",
      range: "£60,000 - £240,000",
      engagementModel: "Phased Architecture & Production Deployment",
    },
    outcomeStatement:
      "We build auditable, deterministic multi-agent state machines, structured extraction engines, and private retrieval systems with zero unverified hallucinations and mandatory human review gates.",
    deliveryPhases: [
      {
        num: "01",
        title: "Domain Schema & Invariant Definition",
        description:
          "Formalizing domain entities, prompt evaluation rubrics, and failure modes into mathematical schemas. We define strict boundaries where the AI system is permitted to act.",
        deliverables: [
          "Zod schema definitions for all model inputs and structured outputs",
          "Deterministic state-machine transition map",
          "Domain evaluation dataset with gold-standard regression tests",
        ],
      },
      {
        num: "02",
        title: "Retrieval & Vector Pipeline Architecture",
        description:
          "Constructing private vector embeddings, semantic retrieval pipelines, and similarity caches to minimise inference cost and latency.",
        deliverables: [
          "Supabase pgvector hybrid semantic-lexical search pipeline",
          "Chunking strategy optimized for document hierarchy and tables",
          "Similarity cache layer cutting recurring query latency by 80%",
        ],
      },
      {
        num: "03",
        title: "State-Machine Agent Orchestration",
        description:
          "Engineering deterministic execution workflows where agents invoke sandboxed tools with validated arguments and human confirmation on threshold operations.",
        deliverables: [
          "State-machine controller with checkpoint rollbacks",
          "Sandboxed tool execution harness with cryptographic audit trails",
          "Human-in-the-loop escalation UI for ambiguous classifications",
        ],
      },
      {
        num: "04",
        title: "Production Hardening & Evaluation CI",
        description:
          "Integration of automated evaluation suites into CI. Every prompt change or model update is evaluated against hundreds of synthetic and historical real-world tests.",
        deliverables: [
          "Automated prompt regression testing pipeline in CI",
          "Real-time inference latency and token expenditure monitoring",
          "Dual-jurisdiction data privacy and zero-retention model agreements",
        ],
      },
    ],
    techStackCategorized: [
      {
        category: "Orchestration & State Control",
        items: [
          {
            name: "Node LTS & TypeScript",
            rationale: "Deterministic state machines with strict typing and fast event loops.",
          },
          {
            name: "Python 3.12",
            rationale: "Specialized batch document ingestion, parsing, and numerical embeddings.",
          },
        ],
      },
      {
        category: "Vector Retrieval & Storage",
        items: [
          {
            name: "Supabase (pgvector)",
            rationale: "Relational ACID transactions co-located with high-dimensional vector embeddings.",
          },
          {
            name: "Hierarchical Hybrid Search",
            rationale: "Combining BM25 full-text indexing with cosine similarity for dense retrieval.",
          },
        ],
      },
      {
        category: "Foundation Models & Validation",
        items: [
          {
            name: "Claude 3.5 Sonnet & GPT-4o",
            rationale: "High-reasoning frontier models constrained strictly via function-calling schemas.",
          },
          {
            name: "Zod Schema Gate",
            rationale: "Zero-tolerance runtime parse errors; unvalidated model output never reaches user.",
          },
        ],
      },
    ],
    engagementDetails: {
      process:
        "Starts with a 2-week feasibility and schema sprint evaluating proprietary datasets against regression rubrics, followed by phased state-machine build and production staging.",
      teamComposition: [
        "Partner Lead & AI Architect",
        "Systems & Data Engineer",
        "Front-End Integration Engineer",
      ],
      timelineRange: "10–16 weeks",
      timelineConfirmation: "Timeline verified for enterprise compliance mandate by Pete Currey.",
      commercialModel: "Phased Architecture Milestone Contract with SLA-backed Accuracy Benchmarks",
    },
    relatedCaseStudySlugs: ["us-regulatory-intelligence-engine"],
    relatedLobbySlugs: ["deterministic-ai-orchestration-in-production"],
    aiCategories: [
      {
        title: "Workflow Automation",
        description:
          "Autonomous ingestion, classification, and routing of complex multi-page institutional documentation with zero manual triage.",
        architecture:
          "Deterministic state machines validating extracted data against Zod schemas before triggering downstream business processes.",
        caseStudyRef: "Empirical verification: 100% schema compliance achieved in US regulatory mandate.",
      },
      {
        title: "Retrieval Systems (RAG)",
        description:
          "High-precision semantic search across thousands of statutory filings, contracts, and internal engineering specifications.",
        architecture:
          "Hybrid lexical-vector retrieval utilizing pgvector with similarity caching and reranking models for sub-second precision.",
        caseStudyRef: "P95 extraction latency under 1.2s across 10,000+ statutory filings.",
      },
      {
        title: "Internal Tooling",
        description:
          "Executive inquiry terminals, automated compliance diffing utilities, and code-review synthesis assistants.",
        architecture:
          "Next.js App Router internal interfaces with optimistic state updates and zero external telemetry exposure.",
        caseStudyRef: "Empirical benchmark pending production audit.",
      },
      {
        title: "Agents with Human Oversight",
        description:
          "Multi-agent collaborative pipelines where complex actions require explicit, authenticated executive sign-off before execution.",
        architecture:
          "Asynchronous human-in-the-loop review queues with cryptographic ledger logging for every decision branch.",
        caseStudyRef: "Full cryptographic audit ledger on all LLM tool actions.",
      },
    ],
  },
  {
    id: "srv-performance-seo",
    slug: "performance-seo",
    code: "SRV-03",
    title: "Performance & Technical SEO",
    category: "Performance Engineering",
    summary:
      "Rigorous diagnostic analysis, script isolation, and code-level modernization for high-value web applications with declining Core Web Vitals or technical crawl barriers.",
    headline:
      "Code-level deconstruction, third-party script isolation, and WCAG 2.2 AA accessibility remediation.",
    description:
      "For enterprise applications suffering from hydration bloat, slow time-to-interactive, and deteriorating search visibility, Avorria conducts thorough code-level audits. We refactor monolithic single-page applications into lean, high-velocity platforms with continuous automated performance gating and international crawl architecture.",
    deliverables: [
      "Comprehensive Core Web Vitals remediation (LCP < 2.0s, INP < 150ms, CLS < 0.02)",
      "Legacy React/Webpack SPA to Next.js 16 / Vite migration blueprint and execution",
      "Full WCAG 2.2 AA accessibility audit, screen-reader testing, and keyboard navigation hardening",
      "Third-party tag deconstruction and isolation via Web Workers (Partytown)",
      "Reciprocal hreflang configuration, XML sitemaps, structured JSON-LD data, and llms.txt crawl surface",
    ],
    techStack: [
      "Chrome DevTools",
      "WebPageTest",
      "Lighthouse CI",
      "Next.js Analyzer",
      "axe-core",
      "TypeScript",
    ],
    architectureFocus: "Critical Path Profiling, Script Elimination, Font Subsetting, A11y Semantics, Crawl Budgets",
    pricingGuidance: {
      currency: "GBP",
      range: "£25,000 - £75,000",
      engagementModel: "Diagnostic Audit & Surgical Remediation Sprint",
    },
    outcomeStatement:
      "We eliminate client-side hydration bottlenecks, quarantine third-party scripts, and implement international hreflang schemas to guarantee Core Web Vitals contractual SLAs and clean indexing.",
    deliveryPhases: [
      {
        num: "01",
        title: "Empirical Baseline & Diagnostic Profiling",
        description:
          "Deep profiling of production waterfalls under throttled 4G network conditions. We identify exact blocking scripts, layout shift instigators, and main-thread task durations.",
        deliverables: [
          "Waterfall trace deconstruction with flamegraph analysis",
          "Comprehensive Core Web Vitals failure attribution report",
          "Technical crawl audit covering indexing, canonicals, and canonical loops",
        ],
      },
      {
        num: "02",
        title: "Surgical Refactoring & Script Isolation",
        description:
          "Eliminating unnecessary client-side polyfills, converting static components to React Server Components, and quarantining marketing tags into Web Workers.",
        deliverables: [
          "Elimination of render-blocking JavaScript bundles",
          "Partytown Web Worker integration for third-party scripts",
          "Font subsetting and self-hosted WOFF2 optimizations",
        ],
      },
      {
        num: "03",
        title: "Accessibility & Semantic Hardening",
        description:
          "Auditing every interactive element against WCAG 2.2 Level AA. Enforcing visible focus rings, ARIA landmarks, and keyboard trap elimination.",
        deliverables: [
          "100% axe-core automated audit pass",
          "Screen-reader verification on VoiceOver and NVDA",
          "Strict focus management on all modals and menus",
        ],
      },
      {
        num: "04",
        title: "Continuous Automated CI Gating",
        description:
          "Embedding performance budgets and lighthouse assertions directly into GitHub Actions or GitLab CI. Non-compliant pull requests are blocked automatically.",
        deliverables: [
          "Lighthouse CI score assertions (> 95 across all categories)",
          "Bundle size limit assertions in CI pull request checks",
          "Real-user monitoring (RUM) telemetry dashboard setup",
        ],
      },
    ],
    techStackCategorized: [
      {
        category: "Diagnostics & Profiling",
        items: [
          {
            name: "Chrome DevTools & Performance Profiler",
            rationale: "Long-task flamegraph analysis and CPU throttling emulation.",
          },
          {
            name: "WebPageTest (Private Instances)",
            rationale: "Repeatable synthetic testing on real mobile hardware worldwide.",
          },
        ],
      },
      {
        category: "Optimization & Isolation",
        items: [
          {
            name: "Next.js Bundle Analyzer",
            rationale: "Granular breakdown of initial chunk weights and duplicate dependencies.",
          },
          {
            name: "Partytown",
            rationale: "Offloading third-party analytics and trackers to background Web Workers.",
          },
        ],
      },
      {
        category: "Accessibility & SEO Auditing",
        items: [
          {
            name: "axe-core",
            rationale: "Industry-standard automated engine for detecting WCAG accessibility faults.",
          },
          {
            name: "Schema.org JSON-LD",
            rationale: "Machine-readable semantic graphs for search engines and AI answer engines.",
          },
        ],
      },
    ],
    engagementDetails: {
      process:
        "Begins with an intensive 1-week diagnostic audit culminating in an architectural remediation roadmap, followed by 3 to 6 weeks of surgical code-level engineering.",
      teamComposition: [
        "Partner Lead & Performance Engineer",
        "Technical SEO & Crawl Architect",
        "Accessibility Specialist",
      ],
      timelineRange: "4–8 weeks",
      timelineConfirmation: "Standard diagnostic and remediation timeline confirmed by Pete Currey.",
      commercialModel: "Fixed-Fee Audit & Remediation Milestone with SLA Guarantees",
    },
    relatedCaseStudySlugs: ["uk-institutional-finance-platform"],
    relatedLobbySlugs: ["engineering-the-sub-second-web"],
  },
  {
    id: "srv-design-brand-systems",
    slug: "design-brand-systems",
    code: "SRV-04",
    title: "Design & Brand Systems",
    category: "Design Systems",
    summary:
      "Architectural design systems, fluid typography, and accessible UI component libraries engineered for enterprise software and high-performance corporate platforms.",
    headline:
      "Mathematical design tokens, restrained editorial typography, and production-ready React components.",
    description:
      "Avorria bridges high-level brand strategy with production engineering. We translate corporate identities into mathematical design tokens, clamp-based fluid typography, and comprehensive React 19 UI component libraries. Every component is rigorously tested for WCAG 2.2 Level AA accessibility, keyboard operability, and zero-layout-shift performance.",
    deliverables: [
      "Mathematical fluid typography scales based on CSS clamp equations",
      "Restrained 12-column architectural grid systems and hairline border tokens",
      "Comprehensive React 19 component library with zero third-party UI dependencies",
      "Full WCAG 2.2 Level AA contrast ratio certification across light and dark surfaces",
      "Living design system documentation route with live component sandbox (/design-system)",
    ],
    techStack: [
      "Tailwind CSS",
      "React 19",
      "TypeScript",
      "Figma Tokens",
      "GSAP",
      "axe-core",
    ],
    architectureFocus: "Mathematical Tokens, Fluid Scales, A11y Certification, Zero-Runtime CSS",
    pricingGuidance: {
      currency: "GBP",
      range: "£35,000 - £120,000",
      engagementModel: "Design System Architecture Sprint",
    },
    outcomeStatement:
      "We translate brand identities into mathematical design tokens, fluid typography, and accessible UI component systems certified to 100% WCAG 2.2 Level AA compliance.",
    deliveryPhases: [
      {
        num: "01",
        title: "Token Mathematics & Brand Translation",
        description:
          "Establishing the core mathematical foundations: fluid clamp scales for typography, precise hairline spacing tokens, and strict WCAG 2.2 AA contrast-checked color variables.",
        deliverables: [
          "Fluid typography equations (clamp-based min/max)",
          "Accessible color matrix ensuring > 4.5:1 text contrast",
          "Figma token synchronization pipeline",
        ],
      },
      {
        num: "02",
        title: "Component Architecture & Accessibility",
        description:
          "Authoring accessible, headless, or lightweight UI components in React 19 and Tailwind CSS. Every interaction pattern includes complete keyboard and screen-reader support.",
        deliverables: [
          "Zero-dependency button, card, header, and input primitives",
          "Full keyboard navigation and focus-visible indicators",
          "Screen-reader semantic structure and ARIA landmark compliance",
        ],
      },
      {
        num: "03",
        title: "Interaction & Motion Systems",
        description:
          "Engineering restrained, editorial motion primitives utilizing GSAP and CSS transforms. All transitions are verified for zero layout shift and reduced-motion compliance.",
        deliverables: [
          "Masked line reveals and underline sweeps",
          "ScrollTrigger scrub wrappers with lifecycle cleanup",
          "Universal prefers-reduced-motion CSS and JS fallbacks",
        ],
      },
      {
        num: "04",
        title: "Living Documentation & CI Token Linting",
        description:
          "Deploying a dedicated, production-grade living design system showcase with interactive token inspectors, contrast tables, and automated linting rules.",
        deliverables: [
          "Dedicated /design-system route with interactive controls",
          "Automated ESLint and stylelint rules preventing token bypass",
          "Component governance guidelines for engineering teams",
        ],
      },
    ],
    techStackCategorized: [
      {
        category: "Token Engineering & CSS",
        items: [
          {
            name: "Tailwind CSS & CSS Variables",
            rationale: "Pure CSS custom properties with zero runtime JavaScript footprint.",
          },
          {
            name: "CSS clamp() Mathematics",
            rationale: "Smooth viewport interpolation without abrupt responsive breakpoint jumps.",
          },
        ],
      },
      {
        category: "Component Primitives",
        items: [
          {
            name: "React 19 Server & Client Components",
            rationale: "Minimal client hydration only where interactivity or state is required.",
          },
          {
            name: "TypeScript Interfaces",
            rationale: "Strictly typed prop contracts for every variant, size, and layout state.",
          },
        ],
      },
      {
        category: "Motion & Accessibility",
        items: [
          {
            name: "GSAP Motion Primitives",
            rationale: "Deterministic micro-interactions constrained to transform and opacity.",
          },
          {
            name: "axe-core Automated Engine",
            rationale: "Automated regression testing ensuring components never violate WCAG.",
          },
        ],
      },
    ],
    engagementDetails: {
      process:
        "A 6- to 10-week intensive engagement aligning executive brand leadership with front-end engineering teams to deliver an immutable design token architecture.",
      teamComposition: [
        "Partner Lead & Design Systems Architect",
        "Senior Front-End Systems Engineer",
        "Brand Identity & Type Specialist",
      ],
      timelineRange: "6–10 weeks",
      timelineConfirmation: "Timeline verified for corporate design system sprint by Pete Currey.",
      commercialModel: "Fixed-Milestone Architecture Sprint with Component Library Delivery",
    },
    relatedCaseStudySlugs: ["uk-institutional-finance-platform"],
  },
];

const US_PRICING_MAP: Record<string, { range: string; currency: "USD" }> = {
  "web-engineering": { range: "$60,000 - $240,000", currency: "USD" },
  "ai-systems": { range: "$80,000 - $320,000", currency: "USD" },
  "performance-seo": { range: "$35,000 - $100,000", currency: "USD" },
  "design-brand-systems": { range: "$45,000 - $160,000", currency: "USD" },
};

function localizeTextToUS(text: string): string {
  return text
    .replace(/minimisation/g, "minimization")
    .replace(/optimisation/g, "optimization")
    .replace(/optimised/g, "optimized")
    .replace(/specialised/g, "specialized")
    .replace(/synchronisation/g, "synchronization")
    .replace(/in favour of/g, "in favor of")
    .replace(/behaviour/g, "behavior");
}

export function getServices(locale: "en-GB" | "en-US" = "en-GB"): Service[] {
  if (locale === "en-GB") {
    return SERVICES;
  }

  return SERVICES.map((service) => {
    const usPricing = US_PRICING_MAP[service.slug] || { range: "$60,000 - $240,000", currency: "USD" };

    return {
      ...service,
      headline: localizeTextToUS(service.headline),
      summary: localizeTextToUS(service.summary),
      description: localizeTextToUS(service.description),
      outcomeStatement: service.outcomeStatement ? localizeTextToUS(service.outcomeStatement) : undefined,
      pricingGuidance: {
        currency: "USD",
        range: usPricing.range,
        engagementModel: service.pricingGuidance.engagementModel,
      },
      architectureFocus: localizeTextToUS(service.architectureFocus),
      deliverables: service.deliverables.map(localizeTextToUS),
    };
  });
}

export function getServiceBySlug(slug: string, locale: "en-GB" | "en-US" = "en-GB"): Service | undefined {
  const services = getServices(locale);
  return services.find((s) => s.slug === slug);
}

