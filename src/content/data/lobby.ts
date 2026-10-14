import type { LobbyArticle } from "../schema";

export const LOBBY_ARTICLES: LobbyArticle[] = [
  {
    slug: "engineering-the-sub-second-web",
    title: "Engineering the Sub-Second Web: Architectural Discipline in React 19 and Next.js",
    publishedAt: "2026-03-15",
    updatedAt: "2026-04-02",
    authorId: "alexander-wright",
    readingTimeMinutes: 7,
    excerpt:
      "Modern web platforms frequently buckle under layers of unmeasured abstractions. Here is how Avorria enforces rigid bundle budgets and sub-second rendering for mission-critical corporate platforms.",
    body: `The modern enterprise web platform frequently suffers from an illusion of progress. Over the past decade, tooling evolved dramatically, yet median load times and bundle sizes worsened across nearly every sector. What was promised as developer velocity has translated into user latency, layout shifts, and battery drain.

At Avorria, our engineering thesis rejects this bloat. We treat milliseconds as contractual commitments. Delivering a sub-second Largest Contentful Paint (LCP) under real-world throttled cellular network conditions requires systematic architectural choices, not post-launch patches.

First, server components must remain the default execution mode. In React 19 and Next.js App Router, the majority of page trees should never emit a single byte of client-side hydration JavaScript. By keeping typography, structural grids, and content delivery strictly on the server, the browser main thread remains unblocked to execute paint operations instantaneously.

Second, motion must be decoupled from layout recalculation. Smooth scrolling and scroll-scrub animations must never trigger reflows. By synchronizing Lenis with GSAP ScrollTrigger and restricting animatable properties strictly to transform and opacity, interfaces achieve smooth frame rates without degrading Core Web Vitals.

Third, performance must be enforced through automated CI gates. Every pull request in an enterprise codebase should fail if it degrades the bundle budget by more than 2 kB or introduces an unmeasured third-party tag. Excellence in software architecture is fundamentally the discipline of knowing what to leave out.`,
    tags: ["Web Architecture", "Next.js", "React 19", "Performance"],
  },
  {
    slug: "deterministic-ai-orchestration-in-production",
    title: "Beyond the Demo: Deterministic AI Orchestration in Corporate Enterprise",
    publishedAt: "2026-04-10",
    updatedAt: "2026-04-12",
    authorId: "elena-rostova",
    readingTimeMinutes: 9,
    excerpt:
      "Why conversational chatbots fail corporate risk assessments, and how deterministic state machines and strict schema boundaries unlock genuine business automation.",
    body: `The enterprise sector is saturated with exploratory AI prototypes that never reach production. The underlying reason is rarely model intelligence; it is non-determinism. Corporate leadership in private banking, legal compliance, and critical infrastructure cannot risk unverified outputs or unbounded execution paths.

Bridging the gap between a promising prototype and an operational enterprise system requires shifting from conversational prompts to deterministic state machines.

In production architectures engineered by Avorria, large language models are never permitted to operate as unchecked controllers. Instead, models function as probabilistic pattern recognizers operating strictly inside deterministic state harnesses. Every tool invocation, data retrieval step, and synthesized output is validated against rigid Zod schemas before it can touch a corporate database or downstream service.

Furthermore, retrieval-augmented generation (RAG) must incorporate strict recency weighting, source citation verification, and similarity thresholds. If confidence scores fall below mathematical cutoffs, the system does not guess; it deterministically routes the task to a human-in-the-loop review queue.

Reliable AI engineering is not about prompt magic. It is rigorous systems engineering: idempotency, deterministic fallbacks, comprehensive telemetry, and provable auditability.`,
    tags: ["Enterprise AI", "State Machines", "Zod", "System Safety"],
  },
];
