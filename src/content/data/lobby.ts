import type { LobbyArticle } from "../schema";

// ---------------------------------------------------------------------------
// Category registry — unique editorial intros for hub pages (150+ words each)
// ---------------------------------------------------------------------------

export const CATEGORY_REGISTRY: Record<
  string,
  { slug: string; title: string; intro: string }
> = {
  "Web Architecture": {
    slug: "web-architecture",
    title: "Web Architecture",
    intro: `Web architecture is not a set of fashionable framework choices — it is a discipline of constraints. Every system decision, from server-component boundaries to bundle splitting strategies, encodes a permanent trade-off between delivery speed, maintainability, and developer surface area. At Avorria, we publish in this category to share what we have learned engineering mission-critical platforms on React 19, Next.js App Router, and Vite: where each tool genuinely excels, where its marketing materials diverge from production reality, and what patterns survive a twelve-month maintenance window. These articles assume readers who write production code. We do not publish introductory tutorials. We publish architectural analysis, benchmark methodology, and the kind of reasoning that helps engineering leads make defensible infrastructure decisions under commercial pressure.`,
  },
  "Performance Engineering": {
    slug: "performance-engineering",
    title: "Performance Engineering",
    intro: `Performance is not an optimisation pass bolted onto finished software — it is an invariant enforced from the first architectural decision. A codebase that ships bloated bundles, layout-shifting renders, or unthrottled third-party scripts does not suffer from a lack of polishing; it suffers from the wrong mental model at the foundation. In this category, Avorria publishes rigorous technical analysis of Core Web Vitals mechanics, Lighthouse scoring methodology, and the real engineering changes — not configuration tweaks — that produce measurable LCP, CLS, and INP improvements on live production systems. We reference real toolchain configurations, CI enforcement patterns, and network telemetry. We never cite synthetic benchmarks as a proxy for production performance. What we publish here we have measured under real cellular throttling conditions on real user devices.`,
  },
  "Technical SEO": {
    slug: "technical-seo",
    title: "Technical SEO",
    intro: `Technical SEO is the intersection of crawler engineering, server infrastructure, and content architecture — and it is persistently misunderstood by practitioners on both sides. Engineering teams treat it as a metadata task. SEO specialists treat it as a content task. Both miss the structural complexity of hreflang reciprocity, canonical graph resolution, render-budget constraints, and index-coverage diagnostics. Avorria operates across UK and US markets simultaneously, which makes transatlantic SEO a genuine engineering discipline rather than a checklist exercise. The articles in this category cover what we have learned shipping sites into Google Search Console with correct coverage, accurate hreflang graphs, and defensible canonical topology. We do not cite keyword counts. We cite HTTP response codes, crawl budget allocations, and schema validation outputs.`,
  },
  "Enterprise AI": {
    slug: "enterprise-ai",
    title: "Enterprise AI",
    intro: `Enterprise AI fails in production for a narrow set of engineering reasons: non-deterministic execution paths, absent schema validation, misaligned latency budgets, and the absence of human-oversight protocols for edge-case routing. The solution is not a better model — it is rigorous systems engineering applied to probabilistic components. At Avorria, we design AI systems that are auditable by compliance officers, testable by QA engineers, and operable by SREs on a Sunday evening. This category documents our engineering approach: deterministic state machines that harness LLM inference, RAG architectures with confidence-threshold routing, structured output contracts enforced by Zod, and evaluation frameworks that measure accuracy on domain-specific holdout sets. We do not publish AI hype. We publish production implementation patterns, failure modes we encountered, and the reasoning that guided our solutions.`,
  },
  "Systems Auditing": {
    slug: "systems-auditing",
    title: "Systems Auditing",
    intro: `A systems audit conducted before a platform rebuild is one of the highest-leverage engineering activities available to a technical leadership team. Done well, it prevents expensive assumptions from surviving the planning phase and entering an engagement as unexamined axioms. Done poorly — which usually means done quickly by a junior resource with a Lighthouse report — it produces false confidence and a migration that hits the same structural walls in a newer framework. Avorria conducts formal technical audits as a prerequisite to rebuild engagements, and the methodology we use is documented in this category. We cover performance instrumentation under production conditions, content inventory, crawl-graph mapping, schema validation, dependency risk assessment, and the final output: a ranked remediation backlog with engineering estimates. These articles are written for principal engineers and technical directors making platform decisions under real budget constraints.`,
  },
};

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getArticleBySlug(slug: string): LobbyArticle | undefined {
  return LOBBY_ARTICLES.find((a) => a.slug === slug);
}

export function getArticles(options?: {
  category?: string;
  status?: "draft" | "published";
  page?: number;
  pageSize?: number;
}): { articles: LobbyArticle[]; total: number; totalPages: number } {
  const { category, status, page = 1, pageSize = 12 } = options ?? {};
  let filtered = LOBBY_ARTICLES;
  if (category) filtered = filtered.filter((a) => a.category === category);
  if (status) filtered = filtered.filter((a) => a.status === status);
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  return {
    articles: filtered.slice(start, start + pageSize),
    total,
    totalPages,
  };
}

export function getCategories(): string[] {
  return Object.keys(CATEGORY_REGISTRY);
}

export function getFeaturedArticle(): LobbyArticle | undefined {
  return LOBBY_ARTICLES.find((a) => a.featured);
}

// ---------------------------------------------------------------------------
// Article data
// ---------------------------------------------------------------------------

export const LOBBY_ARTICLES: LobbyArticle[] = [
  // =========================================================================
  // EXISTING — updated with required new fields
  // =========================================================================
  {
    slug: "engineering-the-sub-second-web",
    title:
      "Engineering the Sub-Second Web: Architectural Discipline in React 19 and Next.js",
    publishedAt: "2026-03-15",
    updatedAt: "2026-04-02",
    authorId: "alexander-wright",
    readingTimeMinutes: 7,
    category: "Web Architecture",
    status: "published",
    excerpt:
      "Modern web platforms frequently buckle under layers of unmeasured abstractions. Here is how Avorria enforces rigid bundle budgets and sub-second rendering for mission-critical corporate platforms.",
    featured: true,
    relatedSlugs: [
      "core-web-vitals-nextjs",
      "nextjs-vs-vite",
      "how-to-audit-site-before-rebuild",
    ],
    tableOfContents: [
      { id: "the-illusion-of-progress", title: "The Illusion of Progress" },
      { id: "server-first-by-default", title: "Server-First by Default" },
      {
        id: "decoupling-motion-from-layout",
        title: "Decoupling Motion from Layout Recalculation",
      },
      {
        id: "performance-as-ci-invariant",
        title: "Performance as a CI Invariant",
      },
      {
        id: "measuring-what-matters",
        title: "Measuring What Actually Matters",
      },
    ],
    tags: ["Web Architecture", "Next.js", "React 19", "Performance"],
    body: `The modern enterprise web platform frequently suffers from an illusion of progress. Over the past decade, tooling evolved dramatically, yet median load times and bundle sizes worsened across nearly every sector. What was promised as developer velocity has translated into user latency, layout shifts, and battery drain.

At Avorria, our engineering thesis rejects this bloat. We treat milliseconds as contractual commitments. Delivering a sub-second Largest Contentful Paint (LCP) under real-world throttled cellular network conditions requires systematic architectural choices, not post-launch patches.

## The Illusion of Progress {#the-illusion-of-progress}

The JavaScript ecosystem has not lacked ambition. We moved from jQuery to Angular to React to server components. We adopted TypeScript for safety, Vite for build speed, and Tailwind for style consistency. Yet HTTP Archive data consistently shows median JavaScript payload growing year over year. The average mobile page delivered more than 450 KB of JavaScript in 2024 — more than three times what a comparable page required in 2016.

The problem is not the tools. It is the unexamined assumptions that accumulate with each layer. A React component that could be a server component gets wrapped in a client component because the developer needed one useState hook. That client component pulls in a date-formatting library, which pulls in a localisation module, which adds 18 KB. Multiply across a component tree and you have a hydration payload that would embarrass a 2010 jQuery plugin.

React 19 and Next.js App Router give teams the primitives to stop this pattern, but they do not enforce it. Enforcement is an architectural decision.

## Server-First by Default {#server-first-by-default}

In React 19 and Next.js App Router, the majority of page trees should never emit a single byte of client-side hydration JavaScript. By keeping typography, structural grids, content delivery, navigation, and footer rendering strictly on the server, the browser main thread remains unblocked to execute paint operations instantaneously.

Our rule at Avorria is simple: a component must justify adding the "use client" directive. The justification must be one of: interactivity that requires event listeners, browser-only APIs such as IntersectionObserver or localStorage, or animation libraries that must run on the client. Presentation logic does not qualify.

This discipline produces measurable results. On a recent corporate platform, switching from a client-rendered content page tree to server components reduced the First Contentful Paint from 1.4 seconds on a throttled 4G connection to 0.54 seconds — without changing the content, design, or network infrastructure. The only change was moving rendering responsibility off the client.

The practical consequence is that server components handle all data fetching, all content rendering, and all layout. Client components are isolated islands of interactivity. This is precisely what React's architectural model intends, and precisely what most teams abandon within three weeks of a project starting.

## Decoupling Motion from Layout Recalculation {#decoupling-motion-from-layout}

Smooth scrolling and scroll-scrub animations must never trigger reflows. This is a performance principle so frequently violated that major design agencies routinely publish Awwwards-winning sites with main-thread-blocking scroll animation handlers.

The mechanism is straightforward: JavaScript that reads layout properties such as offsetTop or getBoundingClientRect during a scroll event forces a layout recalculation on the main thread. If that calculation delays the next frame by more than 16 milliseconds, the animation jitters. If the delay compounds across multiple scroll listeners, you get janky, frame-skipping experiences that degrade to slideshow-level smoothness on mobile hardware.

The solution at Avorria is to synchronise Lenis smooth-scroll with GSAP ScrollTrigger and restrict all animatable properties strictly to transform and opacity. Transform and opacity are compositor-promoted properties: the browser handles them on the GPU compositor thread without touching the main thread layout engine. This means animations remain smooth even when JavaScript is executing expensive logic elsewhere.

We go further: all GSAP animations are constructed with will-change: transform set at component mount and removed at component unmount. We avoid will-change: auto, which provides no rendering hint. And we never animate width, height, top, left, or margin — only translateX, translateY, scale, rotate, and opacity.

## Performance as a CI Invariant {#performance-as-ci-invariant}

Performance must be enforced through automated CI gates, not retrospective audits. Every pull request in an enterprise codebase should fail if it degrades the bundle budget by more than 2 KB uncompressed or introduces an unmeasured third-party tag.

We implement this using Bundlewatch in CI pipelines, configured with hard limits against the gzipped output of each page's JavaScript chunk. A limit breach blocks the pull request and requires explicit override with a written justification added to the PR description. The justification is archived in the git history.

Third-party tag governance is enforced with a Tag Map maintained as a JSON file in the repository. The Tag Map lists every permitted external script, its domain, its loading strategy (async / defer / partytown), its purpose, and its GDPR lawful basis. Any script whose domain does not appear in the Tag Map causes a Playwright end-to-end test to fail. This test runs in CI before any deployment.

The result is a codebase where performance degrades only by deliberate, documented decision — never by accumulation.

## Measuring What Actually Matters {#measuring-what-matters}

Lab metrics lie. Lighthouse scores on a developer's M3 MacBook do not represent the experience of the user on a Samsung Galaxy A15 connected to a 4G network losing packets in a commuter train tunnel. Real performance is measured in the field.

We instrument every production deployment with the web-vitals library, reporting LCP, CLS, INP, FID, TTFB, and FCP to a Supabase analytics table with device category and effective connection type as dimensions. We segment by mobile/desktop and by connection speed. A platform that scores 98 in Lighthouse but delivers 2.3-second LCP on mid-tier Android devices has failed, regardless of what the lab says.

Excellence in software architecture is fundamentally the discipline of knowing what to leave out, and knowing how to measure what remains.`,
  },

  {
    slug: "deterministic-ai-orchestration-in-production",
    title:
      "Beyond the Demo: Deterministic AI Orchestration in Corporate Enterprise",
    publishedAt: "2026-04-10",
    updatedAt: "2026-04-12",
    authorId: "elena-rostova",
    readingTimeMinutes: 9,
    category: "Enterprise AI",
    status: "published",
    excerpt:
      "Why conversational chatbots fail corporate risk assessments, and how deterministic state machines and strict schema boundaries unlock genuine business automation.",
    relatedSlugs: [
      "ai-automation-human-oversight",
      "how-to-audit-site-before-rebuild",
    ],
    tableOfContents: [
      { id: "why-prototypes-die", title: "Why Prototypes Die Before Production" },
      {
        id: "deterministic-state-machines",
        title: "The Deterministic State Machine Pattern",
      },
      {
        id: "schema-validated-outputs",
        title: "Schema-Validated Outputs with Zod",
      },
      {
        id: "rag-confidence-routing",
        title: "RAG with Confidence-Threshold Routing",
      },
      { id: "audit-trail-first", title: "Audit Trail as a First-Class Concern" },
    ],
    tags: ["Enterprise AI", "State Machines", "Zod", "System Safety"],
    body: `The enterprise sector is saturated with exploratory AI prototypes that never reach production. The underlying reason is rarely model intelligence — it is non-determinism. Corporate leadership in private banking, legal compliance, and critical infrastructure cannot risk unverified outputs or unbounded execution paths.

Bridging the gap between a promising prototype and an operational enterprise system requires shifting from conversational prompts to deterministic state machines. This article documents the architectural patterns that make that shift concrete.

## Why Prototypes Die Before Production {#why-prototypes-die}

The typical AI prototype lifecycle follows a predictable arc: a developer integrates an API, writes a system prompt, demonstrates a compelling demo to leadership, and receives approval to productionise. Three months later, the project is quietly shelved.

The failures cluster around the same failure modes. First, the system produces outputs that cannot be validated by the receiving application — a JSON object where a field is sometimes a string and sometimes an array. Second, the system has no mechanism for handling queries outside its domain — it fabricates answers rather than escalating. Third, there is no audit trail that would satisfy a compliance officer or an external auditor. Fourth, production costs exceed projections because the system calls the LLM for every query, including those that could be answered deterministically.

None of these failures are model failures. They are systems engineering failures.

## The Deterministic State Machine Pattern {#deterministic-state-machines}

In production architectures engineered by Avorria, large language models are never permitted to operate as unchecked controllers. Instead, models function as probabilistic pattern recognisers operating strictly inside deterministic state harnesses.

The state machine defines a finite set of states, a finite set of transitions, and a set of preconditions that must be satisfied before each transition fires. The LLM is one actor in this machine — not the controller. It receives a bounded input (a formatted context window with a structured output schema), produces a structured output, and that output is validated before it can trigger a state transition.

In practice, this means defining the workflow as a directed graph where every node is a deterministic function. An LLM inference call is wrapped in a function that: constructs the prompt deterministically from typed inputs, calls the model with temperature set to the lowest value consistent with the task, receives a response, validates the response against a Zod schema, and either proceeds to the next node or routes to an error-handling state.

The LLM never decides what to do next. The state machine decides, based on validated outputs from the LLM.

## Schema-Validated Outputs with Zod {#schema-validated-outputs}

Every tool invocation, data retrieval step, and synthesised output is validated against rigid Zod schemas before it can touch a corporate database or downstream service. This is not defensive programming — it is a contractual boundary between probabilistic and deterministic system components.

The schema contract is defined before the LLM prompt is written. The prompt is written to produce outputs that satisfy the contract. When the output fails validation — which happens — the system does not crash. It routes to a structured retry logic path with a modified prompt that includes the validation error as explicit feedback. After a configured maximum retry count, the system escalates to a human review queue.

The Zod schema serves a second purpose: documentation. When a compliance officer asks what the AI system is permitted to output, the answer is the Zod schema, expressed as a human-readable type definition. This transforms an opaque neural network into a system with auditable output boundaries.

## RAG with Confidence-Threshold Routing {#rag-confidence-routing}

Retrieval-augmented generation must incorporate strict recency weighting, source citation verification, and similarity thresholds. If confidence scores fall below mathematical cutoffs, the system does not guess — it deterministically routes the task to a human-in-the-loop review queue.

We implement RAG with a tiered retrieval strategy. The first tier is a direct lookup against a structured knowledge base — a Supabase table with pgvector embeddings. If the nearest-neighbour similarity score exceeds 0.88 (cosine similarity), the system uses the retrieved document as its primary context. Between 0.72 and 0.88, it retrieves the top-three documents and constructs a synthesised context with citations. Below 0.72, it does not attempt retrieval — it classifies the query as out-of-domain and routes to human review.

These thresholds are not arbitrary. They are calibrated against a held-out evaluation set of domain-specific questions with verified answers. The calibration process produces a precision-recall curve for each threshold value, and the production threshold is selected to achieve a minimum of 95% precision on the held-out set. This process is re-run whenever the knowledge base is materially updated.

## Audit Trail as a First-Class Concern {#audit-trail-first}

Reliable AI engineering is not about prompt magic. It is rigorous systems engineering: idempotency, deterministic fallbacks, comprehensive telemetry, and provable auditability.

Every inference call in a production Avorria AI system logs the following to an append-only audit table: the state machine node ID, the prompt template ID and version, the full formatted prompt, the raw model response, the validated output or the validation error, the routing decision, and the latency in milliseconds. The table is append-only — rows are never updated or deleted.

This means that for any output the system has ever produced, we can reconstruct the exact sequence of inputs and decisions that produced it. For regulated industries, this is the difference between an AI system that can be operated under a compliance framework and one that cannot.

The audit table also enables evaluation at scale. By querying real production traces, we can identify the specific input patterns that cause validation failures, retries, or human escalations, and use those patterns to improve prompt templates and retrieval strategies without requiring a manually curated evaluation set.`,
  },

  // =========================================================================
  // NEW DRAFT ARTICLES — 6 required topics
  // =========================================================================

  {
    slug: "core-web-vitals-nextjs",
    title:
      "Core Web Vitals for Next.js Sites: Engineering Real Improvements to LCP, CLS, and TTFB",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    authorId: "pete-currey",
    readingTimeMinutes: 14,
    category: "Performance Engineering",
    status: "draft",
    excerpt:
      "Lighthouse scores are lab fiction. This article covers the production engineering changes — server architecture, image delivery, font loading, and third-party governance — that move real-user LCP, CLS, and TTFB metrics on Next.js App Router deployments.",
    relatedSlugs: [
      "nextjs-vs-vite",
      "engineering-the-sub-second-web",
      "how-to-audit-site-before-rebuild",
    ],
    tableOfContents: [
      {
        id: "lab-vs-field-divide",
        title: "The Lab vs. Field Divide",
      },
      {
        id: "lcp-engineering",
        title: "Engineering LCP: What Actually Moves the Number",
      },
      {
        id: "cls-root-causes",
        title: "CLS Root Causes and Structural Fixes",
      },
      {
        id: "ttfb-architecture",
        title: "TTFB: A Server Architecture Problem",
      },
      {
        id: "inp-and-interaction-budget",
        title: "INP and the Interaction Budget",
      },
      {
        id: "field-data-pipeline",
        title: "Building a Field Data Pipeline",
      },
      {
        id: "ci-performance-gates",
        title: "CI Gates That Actually Enforce Performance",
      },
    ],
    tags: [
      "Core Web Vitals",
      "Next.js",
      "LCP",
      "CLS",
      "TTFB",
      "Performance Engineering",
    ],
    body: `DRAFT SPECIFICATION · PENDING OWNER REVIEW

Core Web Vitals exist because Google needed a proxy for user experience that could be measured without user research. The three primary signals — Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint — are deliberately narrow definitions of specific, measurable moments in the browser rendering lifecycle. Understanding what they actually measure is a prerequisite to engineering improvements rather than gaming scores.

## The Lab vs. Field Divide {#lab-vs-field-divide}

Lighthouse measures lab performance: a simulated load on a controlled machine with a simulated network throttle applied by the Chrome DevTools protocol. This is useful for catching regressions and establishing baselines, but it is not what Google uses in ranking signals. Google uses Chrome User Experience Report (CrUX) data: real field measurements aggregated from opted-in Chrome users across the actual devices and networks your users employ.

A Next.js site can score 98 in Lighthouse on a developer's machine while delivering a 2.8-second LCP to the median user on a budget Android device over a congested 4G connection. These numbers are not contradictory — they are measuring different things.

The engineering implication is that you must instrument field data and optimise against it, not against Lighthouse. The web-vitals JavaScript library (maintained by the Chrome team) provides accurate field measurements for LCP, CLS, INP, FCP, TTFB, and FID. It should be integrated into every production Next.js deployment and reporting to a data store you control, segmented by device type and effective connection type.

## Engineering LCP: What Actually Moves the Number {#lcp-engineering}

LCP measures the time from navigation start to when the largest content element in the viewport becomes visible. On a typical content page, the LCP element is either a hero image, a heading, or a large block of text. On a correctly engineered Next.js page, the LCP element should be a server-rendered heading — not an image — because text is delivered inline in the HTML stream and requires no additional network round-trip.

When the LCP element is an image, four distinct delays compound to produce the final LCP time: Time to First Byte (the server must respond), resource load delay (the browser must discover the image URL), resource load duration (the image must download), and render delay (the browser must paint it). Each has a different solution.

**Fetch Priority.** In Next.js, the Image component accepts a \`priority\` prop. This should be set on exactly one image per page — the LCP element — and on no others. This tells the browser to fetch the image early in the resource waterfall using the \`fetchpriority="high"\` attribute, bypassing the standard preload scanner delay. Common mistake: setting \`priority\` on multiple images, which dilutes the browser's bandwidth allocation.

**Image sizing and format.** Next.js serves images through its built-in optimisation pipeline when using the Image component, which handles WebP/AVIF conversion and responsive sizing via \`srcset\`. The critical configuration is the \`sizes\` attribute, which tells the browser the expected display width of the image at each viewport breakpoint. Without an accurate \`sizes\` attribute, the browser may download a 1200-pixel image to fill a 400-pixel slot on mobile. This wastes bandwidth and delays LCP.

**Font loading and LCP.** If the LCP element is text, font loading becomes the constraint. A Next.js site using \`next/font\` with display: swap will render the LCP element in the fallback system font first, then repaint when the custom font loads. This repaint can trigger a visual change that extends the LCP measurement window if the font causes layout reflow. The fix is to use \`display: optional\` for secondary typefaces and to use \`next/font\` with \`preload: true\` (the default), which inlines a preload hint in the document head.

**Partial Prerendering and LCP.** Next.js 15 introduced Partial Prerendering (PPR), which streams a static shell immediately while dynamic content loads in the background. If the LCP element is in the static shell, PPR dramatically improves LCP by delivering paintable HTML with the first TCP packet. If the LCP element is in a dynamic section (behind a Suspense boundary), it inherits the dynamic data latency. Audit which elements are behind Suspense boundaries and move the LCP element outside them.

## CLS Root Causes and Structural Fixes {#cls-root-causes}

Cumulative Layout Shift accumulates shift scores from all unexpected layout movements that occur within 500 milliseconds of the last user input. The most common sources on Next.js sites fall into five categories.

**Undimensioned images.** Any \`<img>\` element without explicit width and height attributes causes the browser to reserve zero space for the image until it loads, then shift the layout to accommodate it. Next.js Image automatically renders width/height attributes from the component props and sets \`aspect-ratio\` in the inline style. This eliminates image-caused CLS. Teams that bypass the Image component with raw \`<img>\` tags must specify dimensions explicitly.

**Web fonts causing FOUT.** Flash of Unstyled Text occurs when the browser renders text in a fallback font, then repaints in the custom font once it loads. If the custom font has different metrics than the fallback — different line-height, character width, or descender depth — the text block changes size, shifting content below it. The mitigation in Next.js is to declare \`adjustFontFallback: true\` on the \`next/font\` configuration, which generates a fallback font declaration with adjusted metrics to minimise visual shift.

**Dynamic content insertion.** Banners, cookie notices, and personalised content blocks that insert above the fold after initial render are the highest-impact CLS sources on enterprise sites. Each one pushes the viewport content down by its own height. The correct pattern is to reserve the space during server render — even if the block is empty — so the layout does not shift when the content arrives. For cookie banners, this means rendering a placeholder of the same height as a fixed element outside the document flow.

**Skeleton screens with wrong dimensions.** A skeleton screen that reserves slightly different dimensions than the content it replaces causes a shift when the real content hydrates. This is common when skeleton dimensions are hardcoded rather than matched to the actual content structure.

**Third-party embeds.** Any embed — a social media widget, a video player, a map — that is not given explicit dimensions before it loads will cause CLS. Use the \`aspect-ratio\` CSS property on a containing element and set overflow: hidden.

## TTFB: A Server Architecture Problem {#ttfb-architecture}

Time to First Byte measures the time from the browser initiating a request to receiving the first byte of the response. For a Next.js App Router deployment on Vercel, TTFB has three components: DNS resolution time, TCP connection and TLS handshake time, and server processing time.

DNS and TLS are infrastructure concerns largely outside application code. Server processing time — the time Next.js takes to render the page and begin streaming the response — is where application engineering has the most leverage.

The primary lever is caching. Next.js App Router supports four distinct caching mechanisms: the full-page cache (static generation), the React cache (per-request deduplication), fetch cache (configurable per-fetch), and unstable_cache for arbitrary function memoisation. A page served from the full-page cache (a fully statically generated page) has near-zero server processing time — the response is pre-computed at build time and served from the CDN edge. A page that requires dynamic rendering on every request inherits the full server processing time, including any database queries.

The correct approach is to make as much of each page static as possible and isolate dynamic sections behind Suspense boundaries using React's Streaming SSR. The static shell is delivered immediately from the CDN edge (low TTFB), and the dynamic sections stream in as Promises resolve. This pattern delivers the TTFB characteristics of static pages with the freshness characteristics of dynamic rendering.

Database query performance is the other significant TTFB lever. A Supabase query that takes 400 milliseconds to return results will add 400 milliseconds to TTFB for any page that requires that data for the initial render. Index coverage, connection pooling via Supabase's PgBouncer, and query selectivity should all be tuned before a Next.js performance optimisation project begins.

## INP and the Interaction Budget {#inp-and-interaction-budget}

Interaction to Next Paint replaced First Input Delay as a Core Web Vital in March 2024. Unlike FID, which measured only the delay before the browser could begin processing an interaction, INP measures the full duration from interaction to the next visual paint — including any JavaScript execution and layout work triggered by the interaction.

The interaction budget on a page is constrained by the main thread. Every click, keystroke, or tap fires an event that queues on the main thread. If the main thread is busy executing JavaScript when the event fires, the interaction is delayed. If the event handler itself executes expensive JavaScript, the next paint is delayed even after the event fires.

In Next.js, INP issues typically arise in client components with expensive re-render logic. The most effective mitigations are: splitting large event handlers into synchronous UI-update steps and deferred background steps using startTransition; memoising expensive computations with useMemo; and avoiding synchronous operations in event handlers that could be deferred (analytics reporting, localStorage writes, non-critical state updates).

The React DevTools Profiler is the correct tool for identifying expensive render cascades triggered by interactions. Network tab timing in Chrome DevTools is not sufficient — it shows network activity but not main-thread JavaScript execution time.

## Building a Field Data Pipeline {#field-data-pipeline}

A field data pipeline collects real-user measurements and makes them actionable. The minimum viable implementation uses the web-vitals library, a Next.js API route (or edge function), and a database table.

Install the web-vitals library and call onLCP, onCLS, onINP, onFCP, and onTTFB in a client component mounted in the root layout. Each callback receives a metric object with a name, value, rating (good/needs-improvement/poor), and id. Send this to a lightweight API endpoint — or use Vercel's built-in Web Vitals integration — with device category and connection type appended from the Navigator API.

Store measurements in a table with columns for metric name, value, rating, device_type (mobile/desktop/tablet), effective_connection_type (4g/3g/2g), url, and timestamp. Query by 75th percentile value per metric (not mean — Google uses the 75th percentile for CrUX assessments). A page with a 75th percentile LCP of 2.4 seconds means 25% of users experience an LCP worse than 2.4 seconds.

Review field data weekly during active development. Segment by device type — mobile LCP is typically 3-5× slower than desktop LCP on the same page, and desktop-only optimisations are frequently counterproductive if they add JavaScript that blocks mobile paint.

## CI Gates That Actually Enforce Performance {#ci-performance-gates}

Automated performance enforcement prevents regression without requiring vigilance from every developer on every pull request. The toolchain that covers the most important cases with the least overhead uses three layers.

**Bundle size gates** via Bundlewatch or Next.js Bundle Analyzer with CI enforcement. Configure per-route JavaScript budget limits (for example, no first-load JS bundle exceeding 80 KB gzipped). The gate fails the CI run if any route exceeds its budget, blocking the pull request.

**Lighthouse CI** via the LHCI CLI running a simulated throttled load against a preview deployment. Configure minimum score thresholds for Performance, Accessibility, Best Practices, and SEO. This catches lab-measurable regressions that the bundle gate misses (image format issues, missing fetchpriority, render-blocking resources).

**Playwright performance tests** that check specific measurable outcomes: that the LCP element has fetchpriority="high" or is text; that there are no images without explicit dimensions; that no layout shift exceeds 0.05 for any individual element. These tests encode your architectural decisions as executable specifications.

The bundle gate runs first (fastest). Lighthouse CI runs on preview deployments (slower but catches more). Playwright performance tests run on staging (slowest but most specific). Together they form a graduated enforcement pipeline that catches regressions at the earliest possible stage.`,
  },

  {
    slug: "nextjs-vs-vite",
    title:
      "Next.js vs Vite: An Engineering Decision Framework for 2026 Platforms",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    authorId: "alexander-wright",
    readingTimeMinutes: 12,
    category: "Web Architecture",
    status: "draft",
    excerpt:
      "This is not a benchmark post. It is a decision framework for engineering leads choosing between Next.js App Router and Vite-powered SPAs on the basis of rendering model, SEO requirements, team capability, and deployment target — not framework popularity.",
    relatedSlugs: [
      "engineering-the-sub-second-web",
      "core-web-vitals-nextjs",
      "technical-seo-uk-us-launches",
    ],
    tableOfContents: [
      {
        id: "what-the-question-actually-is",
        title: "What the Question Actually Is",
      },
      {
        id: "rendering-model-first",
        title: "Start with the Rendering Model",
      },
      {
        id: "seo-requirements",
        title: "SEO Requirements as a Decision Axis",
      },
      {
        id: "team-capability-and-operational-cost",
        title: "Team Capability and Operational Cost",
      },
      {
        id: "deployment-and-infrastructure",
        title: "Deployment and Infrastructure",
      },
      {
        id: "when-nextjs-wins",
        title: "When Next.js is the Correct Choice",
      },
      {
        id: "when-vite-wins",
        title: "When Vite is the Correct Choice",
      },
      {
        id: "hybrid-architectures",
        title: "Hybrid Architectures and Their Trade-offs",
      },
    ],
    tags: [
      "Web Architecture",
      "Next.js",
      "Vite",
      "React",
      "Server Side Rendering",
      "Decision Framework",
    ],
    body: `DRAFT SPECIFICATION · PENDING OWNER REVIEW

The Next.js versus Vite question is asked so frequently because it is framed incorrectly. Teams ask it as a performance question — which is faster? — when it is fundamentally a rendering model question — what should run on the server, and what should run in the browser? The answer to the rendering question determines the answer to every other question, including performance.

## What the Question Actually Is {#what-the-question-actually-is}

Next.js, in its App Router form, is a full-stack React framework with server-side rendering, static generation, streaming, Partial Prerendering, and a built-in edge deployment model. Vite is a build tool that serves a JavaScript bundle to the browser. A Vite-powered SPA with React renders the entire application in the browser; a Next.js deployment renders as much of the application on the server as possible.

This is not a matter of preference — it is a fundamental architectural commitment. A Vite SPA requires the browser to download a JavaScript bundle, execute it, fetch data from an API, and then render the page. A Next.js server-rendered page sends complete HTML in the first HTTP response. These are different system designs with different performance characteristics, different SEO properties, different operational requirements, and different developer experience trade-offs.

Framing the choice as "Next.js vs Vite" obscures the real question, which is: "Should my application render on the server or in the browser, and who is the user?" Answer that, and the framework choice largely follows.

## Start with the Rendering Model {#rendering-model-first}

A server-rendered application (Next.js with RSC) is appropriate when:

- Content must be indexed by search crawlers with full fidelity. Googlebot's JavaScript rendering budget is finite and unpredictable. A page whose content is entirely in the initial HTML response is always indexed correctly.
- The initial page load must be fast on low-end devices over slow connections. Server-rendered HTML is smaller than a JavaScript bundle plus its execution, and displays content before any JavaScript executes.
- Data fetching occurs close to the data source. Next.js server components can query a database or internal API with sub-millisecond latency from the same data-centre region, with the result embedded in the HTML. A SPA makes those same queries over the public internet with full round-trip latency.
- Authentication and session management must be handled server-side for security. Next.js middleware and server components can verify sessions before rendering, avoiding the "flash of unauthenticated content" that SPAs display while awaiting an auth check.

A client-rendered application (Vite SPA) is appropriate when:

- The application is accessed behind an authentication layer with no public SEO surface. Internal tools, dashboards, and admin panels do not require search indexing and do not benefit from server-side rendering overhead.
- The application is highly interactive and stateful, with complex client-side data relationships. Rich data visualisation tools, collaborative editing interfaces, and design tools have interaction patterns that are poorly matched to server components.
- The team has strong React SPA experience but limited server-side rendering knowledge, and the project timeline does not accommodate the learning curve.
- The deployment target is a pure static file host — an S3 bucket, GitHub Pages, or an embedded web view in a native app — with no server execution environment.

## SEO Requirements as a Decision Axis {#seo-requirements}

For any site whose business depends on organic search traffic, SEO requirements are the most important decision axis. Next.js server rendering delivers a significant structural advantage for SEO that Vite cannot match without a server-side rendering layer.

Googlebot does render JavaScript. However, its rendering is deferred — crawled JavaScript-only pages enter a rendering queue that can take days to process, and the rendering budget per site is finite. Sites with large page counts may find that many pages are never rendered at all. A server-rendered page is indexed from the raw HTML, immediately, with no rendering queue.

The practical implication: if the site's content — its headings, body copy, structured data, and canonical URLs — must be present in the server response body (not assembled by JavaScript after download), Next.js with static generation or SSR is the only correct choice in the React ecosystem.

For UK/US transatlantic sites, hreflang tags must also be present in the server response. Hreflang implemented via JavaScript (injected after render) is unreliable — Googlebot may read the page before JavaScript executes and see no hreflang, then cache an incorrect canonical mapping. Server-rendered hreflang in the HTML head, as Next.js \`generateMetadata\` produces it, is the reliable pattern.

## Team Capability and Operational Cost {#team-capability-and-operational-cost}

Next.js App Router has a steeper learning curve than Vite. The server component mental model — which components execute on the server, which on the client, what data crosses the boundary — is non-trivial and produces subtle bugs when misunderstood. Teams without prior App Router experience typically spend several weeks developing the intuition to work productively.

The operational cost of Next.js is also higher. A Next.js deployment requires a Node.js server or a serverless execution environment (Vercel, AWS Lambda). A Vite SPA deployment requires only a static file server — operationally simple, cheap, and requiring no server-side runtime knowledge.

For a ten-person product team building an internal dashboard with no SEO requirements, the operational and learning cost of Next.js is difficult to justify. For a two-person agency team building a public-facing marketing platform in a competitive organic search environment, Vite without SSR creates a structural SEO disadvantage that cannot be patched after launch.

## Deployment and Infrastructure {#deployment-and-infrastructure}

Next.js is designed for Vercel but runs well on any Node.js host: Railway, Render, AWS App Runner, Google Cloud Run, and self-hosted containers. Edge deployment (running server components at CDN edge locations globally) is a Vercel-specific feature — other hosts run server components in a single region.

Vite SPAs deploy to any static file host. CDN distribution is automatic and zero-configuration. Cold-start latency, which is a real concern with serverless Next.js deployments, does not exist for static files.

For teams deploying to infrastructure they manage directly — a Kubernetes cluster, a self-hosted VPS — a Vite SPA with a separate API layer (Express, Fastify, or a dedicated backend) may have lower operational overhead than a Next.js deployment, depending on the team's Node.js operations capability.

## When Next.js is the Correct Choice {#when-nextjs-wins}

Next.js App Router is the correct choice when three or more of the following are true:

- The site has a public URL surface that must rank in organic search
- The LCP element is content (text, images) that must be present in the initial HTML
- The team needs server-side authentication, session management, or request-level personalisation
- The site has transatlantic or multilingual audiences requiring server-rendered hreflang
- Data fetching from a database or internal API should be close to the data source for latency
- The deployment target is Vercel or a managed cloud with a Node.js execution environment

## When Vite is the Correct Choice {#when-vite-wins}

Vite with React is the correct choice when three or more of the following are true:

- The application is behind authentication with no public search indexing requirement
- The interaction model is highly stateful and benefits from a single-page application architecture
- The team has strong SPA experience and the project timeline does not accommodate an RSC learning curve
- The deployment target is a static host, a CDN bucket, or an embedded web view
- The build pipeline must be simple to maintain by a team without Node.js server operations knowledge
- The application will be distributed as an Electron or Tauri desktop application

## Hybrid Architectures and Their Trade-offs {#hybrid-architectures}

A third option exists: a Next.js shell (for server-rendered landing pages and marketing content) with a Vite-built SPA embedded in authenticated sections. This hybrid approach is used by SaaS products that need excellent SEO on their public marketing pages and a highly interactive application experience for logged-in users.

The trade-offs of the hybrid approach are significant. You maintain two build pipelines, two development server configurations, and two deployment targets. Shared component code must be carefully structured to avoid duplication. Authentication state must be synchronised between the server-rendered shell and the SPA.

For most teams, the hybrid is more complexity than it is worth. The cleaner architecture is to choose one model and accept its trade-offs. A Next.js site with well-structured client components can be as interactive as a SPA; a Vite SPA with a separate SSR layer (Vite's server-side rendering API) can achieve server rendering. Both add complexity relative to their canonical deployment pattern.

The decision is architectural, not tribal. Make it based on user requirements, team capability, and operational context — not on framework popularity.`,
  },

  {
    slug: "technical-seo-uk-us-launches",
    title:
      "Technical SEO Foundations for Transatlantic UK/US Launches: Infrastructure, Crawl Architecture, and Schema",
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    authorId: "pete-currey",
    readingTimeMinutes: 13,
    category: "Technical SEO",
    status: "draft",
    excerpt:
      "Launching a platform into both UK and US markets simultaneously introduces structural SEO complexity that goes beyond keyword research. This article covers the server architecture, crawl budget decisions, canonical topology, and schema implementation required to avoid index cannibalisation and rank correctly in both markets.",
    relatedSlugs: [
      "hreflang-done-properly",
      "nextjs-vs-vite",
      "core-web-vitals-nextjs",
    ],
    tableOfContents: [
      {
        id: "the-structural-problem",
        title: "The Structural Problem with Transatlantic SEO",
      },
      {
        id: "url-architecture-decision",
        title: "URL Architecture: The Decision You Cannot Change Later",
      },
      {
        id: "canonical-topology",
        title: "Canonical Topology and Duplicate Content",
      },
      {
        id: "crawl-budget-allocation",
        title: "Crawl Budget and Indexation Strategy",
      },
      {
        id: "schema-markup-for-two-markets",
        title: "Schema Markup for Two Markets",
      },
      {
        id: "google-search-console-verification",
        title: "Google Search Console: Two Properties, One Strategy",
      },
      {
        id: "core-web-vitals-across-markets",
        title: "Core Web Vitals Across Markets",
      },
    ],
    tags: [
      "Technical SEO",
      "hreflang",
      "UK",
      "US",
      "Canonical",
      "Schema",
      "Crawl Budget",
    ],
    body: `DRAFT SPECIFICATION · PENDING OWNER REVIEW

A transatlantic platform launch — serving UK audiences at the root domain and US audiences at a /us subdirectory, or vice versa — introduces SEO complexity that cannot be resolved with a robots.txt file and a meta description audit. The structural decisions made at launch — URL architecture, canonical relationships, hreflang graph topology, and schema implementation — determine whether the two market sites compete against each other or complement each other in their respective SERPs.

## The Structural Problem with Transatlantic SEO {#the-structural-problem}

Google's index is global. When you publish two pages — one at avorria.com/services and one at avorria.com/us/services — that cover the same service in substantially similar language for different markets, Google must decide which page to serve in response to any given query. Without clear signals, it may serve the wrong page to the wrong market, or determine that the two pages are duplicate content and consolidate them into one, losing the geographic targeting intended for each.

The signals that tell Google which page serves which market are: the hreflang annotation (language and region targeting), the canonical URL (the preferred URL for consolidating duplicate content authority), the geographic content signals in the page body (UK English spelling versus American English, local telephone numbers, local regulatory references), and the geo-targeting setting in Google Search Console.

All four signals must be consistent and mutually reinforcing. A page with correct hreflang but an incorrect canonical pointing to the other market's URL sends contradictory signals and produces unpredictable results.

## URL Architecture: The Decision You Cannot Change Later {#url-architecture-decision}

The URL structure for a transatlantic site is the most consequential technical SEO decision you will make, and it is largely irreversible after launch without a migration project. The three structural options are: subdirectory (/us/), subdomain (us.avorria.com), and separate domain (avorriausa.com).

**Subdirectory** (/us/) is the architecture Avorria uses and recommends for most two-market scenarios. All domain authority — inbound links, historical ranking signals, PageRank — accumulates to a single root domain. Google treats subdirectories as part of the same site and allocates crawl budget accordingly. URL structure is simple to reason about. Canonical relationships between UK and US pages are easy to express.

**Subdomain** (us.avorria.com) was historically treated by Google as a separate site, which fragmented domain authority. Google has since updated its guidance to say it treats subdomains like subdirectories in most cases, but the practical behaviour in Search Console and in link equity accumulation still differs enough that subdirectory is the safer choice for new deployments.

**Separate domain** (avorriausa.com) requires building a completely separate domain authority from zero and maintaining two full SEO programs. This may be appropriate for mature brands with distinct market identities, but for a new transatlantic launch it is almost always counterproductive.

Once you have chosen a URL structure and accumulated organic links, rankings, and search console history under it, migrating to a different structure requires a full domain migration with 301 redirects — a process that reliably causes temporary ranking drops and requires months to fully recover. Choose your URL architecture before launch and treat it as a long-term infrastructure decision.

## Canonical Topology and Duplicate Content {#canonical-topology}

A canonical URL tells Google which version of a page is the preferred one for consolidating ranking signals. For a transatlantic site, the canonical relationship between the UK and US versions of the same page must be explicitly declared.

The correct pattern: each page should be self-referencing canonical. The UK page at /services/web-engineering declares canonical: https://avorria.com/services/web-engineering. The US page at /us/services/web-engineering declares canonical: https://avorria.com/us/services/web-engineering. Neither page's canonical points to the other.

This is the self-referencing canonical pattern, and it is the correct one for geographically distinct content. It tells Google that both pages are canonical within their own scope and that neither is a duplicate of the other.

A common mistake is pointing the US canonical to the UK URL: the /us/page declares canonical: /page. This tells Google that the US page is a duplicate of the UK page, which causes Google to consolidate all ranking signals to the UK URL. The US page will not rank independently in US SERPs.

Another common mistake is omitting canonicals entirely, relying on hreflang to handle the relationship. Hreflang and canonical serve different purposes. Canonical tells Google which URL to use for deduplication. Hreflang tells Google which URL to serve to which geographic audience. You need both, and they must be consistent.

## Crawl Budget and Indexation Strategy {#crawl-budget-allocation}

Crawl budget is the number of pages Googlebot will crawl on your site within a given period, determined by your site's historical crawl rate and Googlebot's estimate of how quickly your server can respond. For a new domain with a transatlantic structure, crawl budget is particularly important because you are asking Google to crawl two versions of every page.

The sitemap XML file is the primary tool for communicating crawl priorities to Googlebot. For a transatlantic site, the sitemap should include both UK and US URLs for every page, each with accurate lastmod dates and the hreflang alternates block as specified in Google's sitemap hreflang documentation. Accurate lastmod dates — generated from the actual content modification date, not from build time — help Googlebot prioritise recrawling pages that have genuinely changed.

Pages that should not consume crawl budget should be excluded from the sitemap (not merely marked noindex). The sitemap tells Googlebot where to find content worth indexing; robots.txt tells Googlebot what it is not allowed to crawl. Noindex tells Googlebot it can crawl but should not index. Each has a distinct purpose and they are not interchangeable.

For a Next.js App Router site, the sitemap is generated in src/app/sitemap.ts as a typed function returning MetadataRoute.Sitemap. Critically, this file must be synchronous and use top-level imports — not dynamic imports — to avoid build-time module resolution issues. The generated sitemap should be submitted to both UK and US Search Console properties.

## Schema Markup for Two Markets {#schema-markup-for-two-markets}

Schema markup provides structured data that helps Google understand what your pages contain, potentially enabling rich results in SERPs. For a transatlantic service business, the relevant schema types are Organization, ProfessionalService, Service, BreadcrumbList, and WebPage.

The Organization schema should be declared once, at the root domain, with both UK and US contact points. Declaring two separate Organization schemas (one for UK, one for US) creates a fragmented entity graph that Google may struggle to reconcile. Instead, use a single Organization with an array of contactPoint objects, each specifying the areaServed (GB, US), telephone, and email.

The Service schema on individual service pages should include areaServed: ["GB", "US"] on pages that serve both markets, and areaServed: "GB" or areaServed: "US" on pages that are market-specific. This geographic scoping in schema markup reinforces the hreflang geographic targeting.

BreadcrumbList schema should be declared on every page, with the breadcrumb path matching the URL structure. The UK /services/web-engineering page has the breadcrumb: Home > Services > Web Engineering. The US /us/services/web-engineering page has the breadcrumb: Home > Services > Web Engineering (with the same display names — the schema does not need to include the /us/ prefix in the displayed breadcrumb, only in the @id URLs).

Validate all schema with Google's Rich Results Test before launch. Schema errors — particularly malformed datePublished formats or missing required fields — cause Google to ignore the structured data entirely without returning a crawl error, making them easy to miss.

## Google Search Console: Two Properties, One Strategy {#google-search-console-verification}

For a subdirectory structure (avorria.com and avorria.com/us/), you should add both the root domain property (avorria.com) and a URL-prefix property (avorria.com/us/) to Google Search Console. The root domain property provides data for the entire site including the US section. The URL-prefix property gives you a focused view of the /us/ section specifically, with its own performance data, coverage report, and sitemap submission.

Set geotargeting in Search Console for the /us/ URL-prefix property: International Targeting > Country > United States. This is an explicit signal to Google that the /us/ subdirectory targets US audiences. The root domain property should have no geotargeting set — it is a global site whose hreflang annotations communicate geographic targeting at the page level.

Submit the sitemap to both properties. Monitor coverage reports in both properties for indexing issues. The /us/ property will show UK pages as "Crawled, not currently indexed" if Google correctly understands the site structure — this is expected behaviour, not an error.

## Core Web Vitals Across Markets {#core-web-vitals-across-markets}

Core Web Vitals data in Search Console is segmented by page URL. For a transatlantic site, check Core Web Vitals for both UK URLs (/services/) and US URLs (/us/services/) separately. Geographic performance differences may produce different assessment results.

A UK page served from a London-region CDN edge may have excellent LCP in the UK CrUX data and mediocre LCP in US CrUX data if the CDN edge location is not close to US users. Verify that your CDN distributes static assets globally and that your Next.js server functions (or serverless functions) are deployed in a region with low latency to both UK and US users.

For Vercel deployments, edge functions serve from the edge location nearest to the user globally. Standard serverless functions deploy to a single region — by default us-east-1. A US user requesting a page rendered in us-east-1 has lower latency than a UK user requesting the same function. Consider deploying server functions to eu-west or using edge runtime for pages that serve global audiences.`,
  },

  {
    slug: "hreflang-done-properly",
    title:
      "hreflang Done Properly: Bidirectional Reciprocity, x-default, and Canonical Pairing",
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    authorId: "pete-currey",
    readingTimeMinutes: 11,
    category: "Technical SEO",
    status: "draft",
    excerpt:
      "hreflang is one of the most frequently misimplemented technical SEO directives. This article covers the bidirectional reciprocity requirement, x-default semantics, canonical pairing rules, sitemap versus HTML head placement, and how to verify correct implementation with live tooling.",
    relatedSlugs: [
      "technical-seo-uk-us-launches",
      "core-web-vitals-nextjs",
      "how-to-audit-site-before-rebuild",
    ],
    tableOfContents: [
      { id: "what-hreflang-does", title: "What hreflang Actually Does" },
      {
        id: "bidirectional-reciprocity",
        title: "The Bidirectional Reciprocity Requirement",
      },
      { id: "x-default-semantics", title: "x-default: What It Means and What It Does Not" },
      {
        id: "canonical-pairing",
        title: "Canonical and hreflang: Two Separate Directives",
      },
      {
        id: "implementation-in-nextjs",
        title: "Implementation in Next.js generateMetadata",
      },
      {
        id: "sitemap-placement",
        title: "Sitemap Placement vs. HTML Head",
      },
      {
        id: "verification-tooling",
        title: "Verification: How to Confirm Correct Implementation",
      },
      {
        id: "common-failures",
        title: "Common Failure Patterns and Their Consequences",
      },
    ],
    tags: [
      "Technical SEO",
      "hreflang",
      "International SEO",
      "Canonical",
      "Next.js",
    ],
    body: `DRAFT SPECIFICATION · PENDING OWNER REVIEW

hreflang is a link attribute defined by Google to signal which version of a page should be served to users based on language and geographic region. It is one of the most consistently misimplemented SEO directives — not because it is conceptually difficult, but because its requirements are precise and its validation is deferred (errors appear in Search Console days after deployment, not at build time).

## What hreflang Actually Does {#what-hreflang-does}

hreflang tells Google: "For a user searching in this language-region combination, serve this URL rather than the other versions of this page." It does not directly affect which page ranks for a query — it affects which page Google serves in the results when it has multiple geographically targeted versions of the same content.

The practical effect: a UK user searching for "web performance agency" should see avorria.com/services/performance rather than avorria.com/us/services/performance. The hreflang annotation on each page communicates the intended geographic audience, and Google uses that signal to route queries to the correct page.

Without hreflang, Google may serve the same page to users in all markets (typically the page with the most inbound links), or it may detect that the pages are near-duplicates and consolidate their ranking signals in unpredictable ways. Either outcome is worse than correct hreflang implementation.

hreflang does not affect PageRank, does not affect whether a page is indexed, and does not directly affect which queries a page ranks for. It is a geographic routing signal for already-indexed, already-ranking content.

## The Bidirectional Reciprocity Requirement {#bidirectional-reciprocity}

The most commonly violated hreflang rule is reciprocity: every page referenced in a set of hreflang annotations must include a reciprocal hreflang annotation pointing back to every other page in the set.

For a two-market site with UK and US versions of each page, the hreflang set for any given page includes three entries: the en-GB URL, the en-US URL, and the x-default URL. All three entries must appear on both the UK page and the US page.

If the UK page /services includes:
- hreflang="en-GB" href="https://avorria.com/services"
- hreflang="en-US" href="https://avorria.com/us/services"
- hreflang="x-default" href="https://avorria.com/services"

Then the US page /us/services must include:
- hreflang="en-GB" href="https://avorria.com/services"
- hreflang="en-US" href="https://avorria.com/us/services"
- hreflang="x-default" href="https://avorria.com/services"

The sets are identical. Both pages declare the complete set of geographic alternatives. If either page is missing the reciprocal references, Google treats the hreflang as invalid for that page and ignores the geographic targeting signal.

This is not a philosophical requirement — Google's documentation explicitly states: "Each language version must list itself as well as all other language versions." Pages that fail reciprocity will show errors in the hreflang report in Google Search Console.

## x-default Semantics {#x-default-semantics}

x-default is a language/region value that tells Google which page to serve to users whose language or region does not match any of the explicit hreflang values. It is not a "default language" setting — it is a fallback for unmatched users.

For a UK/US site, x-default should point to the UK (root domain) page, or to a language-selector page if you have one. The rationale: UK English is closest to international English, the root domain has the highest domain authority, and Google defaults to the root URL for ambiguous geographic signals.

The x-default value is optional but strongly recommended. Without it, Google must decide what to show users outside your explicit target markets (rest of world, unspecified locale) based on other signals. Providing an explicit x-default removes that ambiguity.

Common misuse of x-default: pointing it to a dedicated /international/ page or a country-selector overlay that does not contain real content. A page that Google crawls for hreflang purposes and finds only a redirect or thin content will be treated as an error. x-default should point to a full-content page.

## Canonical and hreflang: Two Separate Directives {#canonical-pairing}

Canonical and hreflang serve different purposes and must not be conflated. Canonical tells Google which URL to use for consolidating duplicate content. hreflang tells Google which URL to serve to which geographic audience.

The rule for their interaction is precise: when a page has hreflang annotations, its canonical URL must match one of the hreflang URLs in the set. Specifically, the page's self-referencing canonical must match the hreflang URL for that page's locale.

If the UK page /services has canonical: https://avorria.com/services, then the hreflang set for that page must include hreflang="en-GB" href="https://avorria.com/services" — the same URL as the canonical. The canonical and the locale-specific hreflang must match.

A canonical that points to a different URL than the hreflang-attributed URL for that locale creates a contradiction. Google's guidance states that when canonical and hreflang conflict, canonical takes precedence — meaning the hreflang annotation may be ignored in favour of the canonical. If the UK page's canonical points to the US page, Google will consolidate the UK page's signals to the US URL, effectively making the UK page invisible.

The most common canonical/hreflang conflict is on paginated pages. A paginated category page at /services?page=2 may have a canonical pointing to /services (the first page), while the hreflang points to /services?page=2. This conflict will cause the hreflang to be ignored. The correct pattern is for paginated pages to have self-referencing canonicals and independent hreflang sets.

## Implementation in Next.js generateMetadata {#implementation-in-nextjs}

Next.js App Router implements hreflang via the alternates.languages field in the Metadata object returned by generateMetadata. This generates \`<link rel="alternate" hreflang="..." href="...">\` elements in the document \`<head>\`.

A correctly implemented generateMetadata function for the UK services page:

\`\`\`typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: "https://avorria.com/services",
      languages: {
        "en-GB": "https://avorria.com/services",
        "en-US": "https://avorria.com/us/services",
        "x-default": "https://avorria.com/services",
      },
    },
  };
}
\`\`\`

And for the US services page at /us/services:

\`\`\`typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: "https://avorria.com/us/services",
      languages: {
        "en-GB": "https://avorria.com/services",
        "en-US": "https://avorria.com/us/services",
        "x-default": "https://avorria.com/services",
      },
    },
  };
}
\`\`\`

Both pages share the identical languages object — the full set of alternates. The only difference is the canonical URL, which is self-referencing on each page.

For a site with many pages sharing the same hreflang pattern, this logic should be extracted into a constructMetadata utility that generates the correct canonical and languages object from the page path, as Avorria does in src/lib/seo/metadata.ts.

## Sitemap Placement vs. HTML Head {#sitemap-placement}

hreflang annotations can be declared in two places: the HTML head (via link elements), or the XML sitemap (via xhtml:link elements). Both are valid; Google processes both. For a Next.js App Router site, the HTML head implementation via generateMetadata is the recommended approach because it is co-located with the page code and verified at build time.

The sitemap implementation requires a more complex XML structure and is harder to maintain without automation. However, the sitemap approach scales better for very large sites (tens of thousands of pages) where including all hreflang links in every page's HTML head would add significant document weight.

For sites with fewer than ten thousand pages, HTML head hreflang via generateMetadata is the simpler and more maintainable approach. For very large sites, sitemap hreflang can reduce page weight, but requires rigorous sitemap generation tooling to maintain reciprocity.

Never implement hreflang in both places — duplicate hreflang declarations do not reinforce each other and may create inconsistencies if the two implementations diverge.

## Verification: How to Confirm Correct Implementation {#verification-tooling}

After deploying hreflang, verification should proceed in three steps before considering the implementation complete.

**Step 1: HTML source inspection.** Fetch the live HTML of both the UK and US versions of a page using curl or browser developer tools and confirm the link rel="alternate" elements are present in the raw server response (not injected by JavaScript). Each page must include the full set of hreflang values including the self-reference and x-default.

**Step 2: Google Search Console hreflang report.** In Search Console, the International Targeting report (under Index) shows hreflang errors. Common errors shown here: "No return tag" (reciprocity failure), "Incorrect language/region codes" (using "uk" instead of the correct "GB"), and "Self-referencing hreflang tag is missing."

**Step 3: Hreflang crawl validation.** Tools including Screaming Frog, Ahrefs Site Audit, and hreflang.org provide crawl-based hreflang validation. Screaming Frog is particularly useful because it can follow hreflang links across a site and verify the complete reciprocal graph without waiting for Google's crawl cycle.

## Common Failure Patterns and Their Consequences {#common-failures}

**Missing reciprocal tags.** The UK page annotates the US page, but the US page does not annotate the UK page. Google ignores the hreflang for both pages. Both pages may rank in the wrong markets or not rank at all for market-specific queries.

**Wrong locale codes.** Using "uk" instead of "en-GB", or "us" instead of "en-US". The correct format is ISO 639-1 language code plus optional ISO 3166-1 alpha-2 region code, hyphen-separated. Valid: en-GB, en-US, fr-FR. Invalid: uk, us, en_GB.

**Canonical conflict.** The US page canonical points to the UK page. Google consolidates US page signals to the UK URL. The US page does not rank independently.

**JavaScript-injected hreflang.** hreflang added to the DOM by JavaScript after page load. Google may crawl the page before JavaScript executes and see no hreflang. Server-rendered hreflang in the HTML head is always indexed correctly.

**Inconsistent HTTPS vs. HTTP.** hreflang URLs using http:// while canonical URLs use https://. Google treats these as different URLs. All hreflang URLs must use the canonical scheme (https://).

**Omitting self-referencing hreflang.** The page does not include itself in the hreflang set. Google's documentation requires self-referencing. Omitting it causes the "Self-referencing tag is missing" error in Search Console.`,
  },

  {
    slug: "ai-automation-human-oversight",
    title:
      "AI Automation That Needs Human Oversight: Designing Escalation Paths, Confidence Thresholds, and Audit Trails",
    publishedAt: "2026-05-29",
    updatedAt: "2026-05-29",
    authorId: "elena-rostova",
    readingTimeMinutes: 13,
    category: "Enterprise AI",
    status: "draft",
    excerpt:
      "The engineering question for enterprise AI is not whether to include human oversight — it is how to design escalation paths that trigger at the right moments, preserve auditability, and do not become the bottleneck that kills automation value.",
    relatedSlugs: [
      "deterministic-ai-orchestration-in-production",
      "how-to-audit-site-before-rebuild",
    ],
    tableOfContents: [
      {
        id: "the-oversight-design-problem",
        title: "The Oversight Design Problem",
      },
      {
        id: "confidence-threshold-architecture",
        title: "Confidence Threshold Architecture",
      },
      {
        id: "escalation-path-design",
        title: "Escalation Path Design",
      },
      {
        id: "audit-trail-requirements",
        title: "Audit Trail Requirements for Regulated Contexts",
      },
      {
        id: "human-review-queue-engineering",
        title: "Engineering the Human Review Queue",
      },
      {
        id: "feedback-loops-for-calibration",
        title: "Feedback Loops and Threshold Calibration",
      },
      {
        id: "ui-patterns-for-oversight",
        title: "UI Patterns That Support Effective Human Review",
      },
    ],
    tags: [
      "Enterprise AI",
      "Human Oversight",
      "Automation",
      "Audit Trail",
      "Confidence Thresholds",
    ],
    body: `DRAFT SPECIFICATION · PENDING OWNER REVIEW

The question of human oversight in AI automation is frequently framed as a risk management problem: where should a human review the AI's output before it takes effect? This framing produces systems that insert human review at every decision point, eliminating the efficiency gains that motivated automation. The engineering question is more precise: at what confidence levels should the system operate autonomously, at what confidence levels should it escalate, and how should escalation be designed so that it does not become the new bottleneck?

## The Oversight Design Problem {#the-oversight-design-problem}

Automation creates value by removing human labour from decisions that can be made reliably and consistently at scale. Human oversight preserves safety by catching the decisions that automation makes poorly — typically low-confidence edge cases, out-of-distribution inputs, and situations requiring contextual judgement that the model was not trained to provide.

The design challenge is placing oversight at the threshold between these two domains. Too conservative a threshold (escalating anything below 95% model confidence) and humans spend their time reviewing decisions the model handles correctly, burning oversight capacity on non-issues. Too permissive a threshold (escalating only catastrophic failures) and errors compound until a human catches a downstream consequence of an upstream error that was never surfaced for review.

The correct threshold is calibrated against the cost of false positives (unnecessary human reviews) and false negatives (errors that reached production without review). For low-stakes decisions with easily reversible consequences, a permissive threshold minimises oversight burden. For high-stakes decisions with irreversible consequences — publishing content, sending communications, modifying financial records — a conservative threshold is warranted even if it generates more human review work.

## Confidence Threshold Architecture {#confidence-threshold-architecture}

A confidence threshold is a numerical boundary below which the system routes a decision to human review rather than executing it autonomously. Implementing this requires a confidence score for every AI decision — not just a binary correct/incorrect assessment.

For LLM-based systems, confidence is estimated rather than computed. The most reliable proxy is the semantic similarity between the model's output and the expected output distribution, which can be estimated using embedding-based similarity against a representative sample of correct outputs. A low-similarity output indicates the model produced something unusual relative to prior correct outputs — not necessarily wrong, but warranting human verification.

For classification tasks (is this document type A, B, or C?), logit probabilities provide a more direct confidence signal. When the model assigns 97% probability to a single class, confidence is high. When the model assigns 40% to class A and 35% to class B, confidence is low and the case should escalate.

For generation tasks (produce this document given this context), confidence estimation is harder. Common approaches include: consistency sampling (generating the output multiple times with temperature > 0 and measuring variance — high variance indicates uncertainty), self-evaluation (prompting the model to rate its own output quality with a structured rubric), and ensemble confidence (comparing outputs across different prompts or model versions).

The key implementation requirement is that confidence estimation must complete before the output is acted upon — not as a post-hoc audit. The system generates an output, estimates confidence, and then routes based on the confidence score. High confidence: execute autonomously and log. Low confidence: escalate to human review queue.

## Escalation Path Design {#escalation-path-design}

An escalation path is the sequence of states a decision travels through when it cannot be handled autonomously. The design of this path determines whether human oversight is effective (catching real errors) or nominal (generating review tasks that humans rubber-stamp without meaningful evaluation).

A well-designed escalation path has three properties. First, it presents the decision to the reviewer in a structured, interpretable format — not the raw model output, but a summarised representation of what the model proposed, why the system was uncertain, and what the relevant context was. Second, it provides a binary or categorical response interface (approve / reject / modify) rather than a free-text response — this makes review fast, consistent, and machine-readable. Third, it records the reviewer's identity, timestamp, and rationale alongside the original system output.

The escalation queue should present reviews in order of urgency, not arrival time. A decision that will block a downstream process in two hours should surface before a low-urgency decision that arrived first. Urgency should be a property of the task type, set at workflow design time, not inferred by the system.

Reviewers should be matched to task types by competency. A compliance officer reviewing a regulatory classification task and a customer service manager reviewing a sentiment classification task require different domain knowledge. The escalation system should route by task type to the appropriate reviewer pool.

## Audit Trail Requirements for Regulated Contexts {#audit-trail-requirements}

In regulated contexts — financial services, healthcare, legal, insurance — every AI-assisted decision must be reconstructible from stored records. The audit trail must answer: what input did the system receive? what did the model produce? what confidence score was assigned? was the decision escalated? if escalated, who reviewed it, when, and what did they decide? what action was taken as a result?

The minimum audit trail schema for each AI decision record includes: a unique decision ID, the workflow name and version, the input payload (serialised, immutable), the model identifier and version, the raw model response, the parsed and validated output, the confidence score and the method used to estimate it, the routing decision (autonomous execution or escalation), and if escalated: the reviewer ID, review timestamp, review decision, and reviewer notes field.

This schema must be written to an append-only store. Records must never be updated or deleted — only new records (corrections, overrides) can be added. This immutability is what makes the audit trail legally defensible. A correctable audit trail is an auditable log in appearance only.

The append-only requirement has storage implications at scale. An AI system processing ten thousand decisions per day generates ten thousand audit records per day. These records must be retained for the regulatory retention period applicable to the sector — typically seven years for financial records in the UK and US. Design the storage schema and retention architecture before deploying to production.

## Engineering the Human Review Queue {#human-review-queue-engineering}

The review queue is a software engineering problem, not a process problem. A poorly engineered queue becomes a bottleneck that limits the throughput of the entire system and frustrates reviewers, leading to shallow reviews that defeat the purpose of oversight.

The queue should be a persistent, transactional database table with a status column (pending, in_review, approved, rejected, modified) and an assigned_reviewer column. Reviewers should claim tasks by updating assigned_reviewer and setting status to in_review — not by dequeuing from a message queue. The distinction matters: a message queue that delivers a task to a reviewer who is then interrupted may lose the task if the message acknowledgement is not sent. A database-backed queue preserves the task's assigned state.

Review tasks should time out after a configurable period — typically four hours for business-hours tasks. A timed-out task should be unassigned and returned to pending, with a notification to the review queue manager. This prevents tasks from being silently dropped when a reviewer is unavailable.

The review interface should display exactly the information the reviewer needs to make a sound decision, with no extraneous context. Information density should be matched to the time budget expected for each review. A review designed to take thirty seconds should display the decision summary, confidence score, proposed action, and approve/reject buttons on a single screen — no scrolling, no loading states.

## Feedback Loops and Threshold Calibration {#feedback-loops-for-calibration}

Confidence thresholds are initial estimates, not permanent parameters. They must be calibrated against actual system performance using a feedback loop that compares autonomous decisions to human-reviewed decisions.

The calibration process requires a held-out set of decisions where the reviewer's assessment is treated as ground truth. For any decision that the system handled autonomously, if the downstream outcome reveals an error, that decision is added to the calibration set as a false negative (should have escalated). For any decision that escalated and was approved without modification by the reviewer, that decision is added as a false positive (did not need to escalate).

By plotting the false positive rate and false negative rate at each confidence threshold level, you produce a receiver operating characteristic curve specific to your system and domain. The threshold that minimises the weighted sum of false positive cost and false negative cost is the optimal operating point.

This calibration process should run on a defined schedule — quarterly for stable domains, more frequently during periods of input distribution shift (new product releases, regulatory changes, seasonal patterns). A threshold calibrated on historical data may be incorrect for current conditions.

## UI Patterns That Support Effective Human Review {#ui-patterns-for-oversight}

The review interface design has a measurable effect on review quality. Studies in human-AI decision-making consistently show that humans exposed to model outputs before forming their own judgement exhibit automation bias — tendency to approve the model's output regardless of its correctness. This is the opposite of meaningful oversight.

To mitigate automation bias, present the review task in two stages. Stage one: show the reviewer the input (the document, the data, the context) and ask them to form an initial assessment. Stage two: show the model's output and the reviewer's initial assessment side-by-side, and ask for a final decision. This forces deliberate comparison rather than reflexive approval.

Irreversibility cues reduce error rates on consequential decisions. Before a reviewer approves an action with significant downstream effects (publishing, sending, writing to a record), a confirmation step that explicitly names the consequence ("This will publish the document to 12,000 subscribers") prompts the reviewer to engage with the decision's weight rather than treating it as a routine approval task.

Review history should be visible within the review interface. A reviewer who can see the pattern of prior decisions on similar tasks develops calibration — an intuition for what the system handles well and what it gets wrong. This contextual knowledge improves review quality over time and is lost when the review history is stored separately from the review task.`,
  },

  {
    slug: "how-to-audit-site-before-rebuild",
    title:
      "How to Audit a Site Before a Rebuild: A Technical Checklist for Principal Engineers",
    publishedAt: "2026-06-05",
    updatedAt: "2026-06-05",
    authorId: "alexander-wright",
    readingTimeMinutes: 15,
    category: "Systems Auditing",
    status: "draft",
    excerpt:
      "A site audit conducted before a platform rebuild is one of the highest-leverage activities available to an engineering team. This checklist covers performance telemetry, content inventory, crawl-graph mapping, dependency risk, schema validation, and the ranked remediation backlog that makes the audit output actionable.",
    relatedSlugs: [
      "core-web-vitals-nextjs",
      "technical-seo-uk-us-launches",
      "engineering-the-sub-second-web",
    ],
    tableOfContents: [
      {
        id: "audit-before-rebuild",
        title: "Why Audit Before Rebuild",
      },
      {
        id: "performance-instrumentation",
        title: "Phase 1: Performance Instrumentation Under Production Conditions",
      },
      {
        id: "content-inventory",
        title: "Phase 2: Content Inventory and URL Mapping",
      },
      {
        id: "crawl-graph-mapping",
        title: "Phase 3: Crawl Graph and Index Coverage",
      },
      {
        id: "dependency-risk",
        title: "Phase 4: Dependency Risk and Third-Party Exposure",
      },
      {
        id: "schema-and-structured-data",
        title: "Phase 5: Schema and Structured Data Validation",
      },
      {
        id: "accessibility-baseline",
        title: "Phase 6: Accessibility Baseline",
      },
      {
        id: "remediation-backlog",
        title: "Producing the Ranked Remediation Backlog",
      },
      {
        id: "what-to-preserve",
        title: "What to Preserve vs. What to Discard",
      },
    ],
    tags: [
      "Systems Auditing",
      "Technical SEO",
      "Performance Engineering",
      "Pre-Rebuild",
      "Dependency Risk",
    ],
    body: `DRAFT SPECIFICATION · PENDING OWNER REVIEW

A platform rebuild that begins without a formal audit of the existing system is unlikely to produce a better system. It will produce a newer system — built on the same assumptions, inheriting the same structural deficiencies, with an improved visual design. The audit is what converts a rebuild from a technology refresh into a genuine architectural improvement.

This checklist is written for principal engineers and technical directors who are leading or commissioning a pre-rebuild audit. It covers six phases of investigation, the evidence each phase produces, and how to synthesise findings into an actionable remediation backlog.

## Why Audit Before Rebuild {#audit-before-rebuild}

The assumptions that cause a platform to underperform are usually invisible to the teams that built it. Performance problems are rationalised as "acceptable trade-offs." SEO issues are attributed to algorithm changes. Dependency accumulation is not tracked until a security vulnerability surfaces. Accessibility gaps are discovered only when a complaint is filed.

An audit conducted by engineers with no prior involvement in the platform brings fresh pattern recognition. But even an internal audit — conducted by the team that built the system — produces value when it uses systematic measurement rather than retrospective reasoning. "We know the site is slow" is not an audit finding. "The 75th-percentile LCP on mobile is 3.8 seconds because the hero image has no fetchpriority and no explicit dimensions, causing layout shift and extending the LCP measurement window" is an audit finding.

The output of an audit is not a report. It is a ranked backlog of specific, estimated, actionable engineering tasks that the rebuild must address. The difference matters: a report is read once; a backlog is shipped.

## Phase 1: Performance Instrumentation Under Production Conditions {#performance-instrumentation}

Performance measurement must be conducted on the live production system, not on a staging environment, not on a developer's machine, and not using only synthetic tools. The authoritative sources are real-user measurements (field data) and synthetic measurements under simulated throttled conditions (lab data). Both are required because they reveal different failure modes.

**Field data**: Install the web-vitals library on the production site if it is not already present. Configure it to report LCP, CLS, INP, TTFB, and FCP to a logging endpoint. Collect at least 1,000 page-load events segmented by page path, device type (mobile/desktop/tablet), and effective_connection_type. Compute the 75th percentile for each metric per segment. This is your performance baseline.

If the site has been live for at least 28 days, request a Chrome User Experience Report extract via the BigQuery public dataset (google.com/analytics/products/crux) or via PageSpeed Insights API with \`strategy=mobile\`. The CrUX data provides field measurements without requiring instrumentation on the existing site.

**Lab data**: Run Lighthouse CLI in headless mode against the live URL with the following configuration: CPU slowdown 4x, network throttle: 150ms RTT, 1.6 Mbps download (Moto G Power simulation as defined in Chrome 91+ Lighthouse). Run each URL 5 times and take the median score to reduce variance. Capture screenshots at each paint milestone to identify the LCP element visually.

**What to document**: The LCP element on each key landing page (what is it — text or image?), whether it has explicit dimensions, whether it has fetchpriority set, which fonts are render-blocking, which third-party scripts load synchronously in the head, whether CLS occurs above-fold and on which events, and the TTFB for server-rendered vs. cached pages.

## Phase 2: Content Inventory and URL Mapping {#content-inventory}

A content inventory maps every publicly accessible URL on the existing site and records its metadata: HTTP status code, title, meta description, H1, canonical URL, word count, last modified date, and inbound link count. This inventory has two purposes: it reveals the structural scope of the migration (how many pages must be recreated or redirected) and it identifies content that should not survive the rebuild.

Use Screaming Frog or a comparable crawler to crawl the production site. Configure it to follow all internal links and record all response data. Export the crawl results to a spreadsheet.

Filter the results to identify: pages returning non-200 status codes (404, 301, 302, 5xx); pages with duplicate title or meta description; pages with word count below 200 (likely thin content); pages with no inbound links and no sitemap inclusion (likely orphaned). Each of these categories requires a decision: redirect, consolidate, improve, or discard.

The URL mapping is the deliverable: a spreadsheet with columns for old URL, old HTTP status, content disposition (migrate/redirect/discard), new URL (if migrate or redirect), and priority (P1/P2/P3 based on traffic and link equity). This mapping becomes the redirect configuration for the new site.

For sites with significant organic traffic, prioritise URLs by organic traffic volume using Google Search Console data. A URL that receives 1,000 organic sessions per month must have a 301 redirect in the new site. A URL that receives zero organic sessions and has no inbound links can be discarded.

## Phase 3: Crawl Graph and Index Coverage {#crawl-graph-mapping}

The crawl graph audit answers: what does Googlebot actually see when it crawls this site? The question matters because crawling behaviour and indexation are frequently inconsistent with expectations.

Export the Google Search Console coverage report. Note the count of: indexed pages, valid-with-warnings pages, excluded pages (noindex, blocked by robots.txt, canonical redirect, duplicate without user-selected canonical), and error pages (404, server error). Any page that is indexed but should not be, or excluded but should be indexed, represents a structural error to resolve in the rebuild.

Check robots.txt for unintentional crawl exclusions. A robots.txt that blocks /api/ is correct; one that blocks /assets/ may be blocking CSS or JavaScript files that Googlebot needs to render pages. Check the URL Inspection tool in Search Console for key landing pages and confirm that Googlebot's rendered HTML matches the expected server response.

Audit the sitemap. Does it include all pages that should be indexed? Does it exclude all pages that are noindex? Does it have accurate lastmod dates? Does it exceed the 50,000 URL limit per file (requiring splitting)?

For sites with both UK and US content, verify that the International Targeting report in Search Console shows no hreflang errors. Export the list of hreflang errors and categorise them: missing reciprocal tags, incorrect locale codes, canonical/hreflang conflicts. Each category has a specific fix pattern.

## Phase 4: Dependency Risk and Third-Party Exposure {#dependency-risk}

Dependency risk assessment identifies libraries and third-party integrations that create maintenance burden, security vulnerability exposure, or performance overhead. It is one of the most neglected phases of a pre-rebuild audit and one of the highest-value.

For npm dependencies: run npm audit (or pnpm audit) and record all critical and high severity vulnerabilities. Note any packages that are deprecated (the npm registry marks these) or unmaintained (last publish date more than two years ago). Note any packages with a single maintainer and no organisational backing — these carry bus-factor risk.

For third-party scripts: use Screaming Frog or Charles Proxy to capture all outbound network requests made by the production site during a normal page load. Group requests by domain. For each unique domain, record: the script's purpose, its loading strategy (sync/async/defer), its estimated JavaScript payload (from browser network tab), its GDPR lawful basis if it sets cookies, and whether it has a legitimate business justification in the current platform.

This exercise typically reveals: tracking scripts that are firing but no longer connected to an active analytics account; A/B testing scripts from a vendor that was replaced; consent management platform scripts that have been superseded but not removed; and vendor scripts loading additional vendor scripts (script spawning chains). Each of these adds latency without value.

The deliverable is a Tag Map: a structured record of every third-party script, its status (keep/remove/replace), and its permitted loading strategy in the new site. This becomes an enforceable policy in the new site's CI configuration.

## Phase 5: Schema and Structured Data Validation {#schema-and-structured-data}

Schema markup errors are silent — they do not break the site, do not appear in browser consoles, and do not trigger server errors. They simply cause Google to ignore the structured data, suppressing rich results. Most sites that have been maintained for several years have accumulated schema errors from template changes that invalidated previously-correct markup.

Use Google's Rich Results Test to validate the schema on each key page type: home, service/product pages, article pages, contact page. Record each error and warning.

Common schema errors found in audit:

**Organization schema** with a telephone field formatted as a string rather than as E.164 format ("+44 20 XXXX XXXX"). Google accepts E.164 format; it may reject human-readable formatted numbers for telephone-sensitive rich results.

**BreadcrumbList** items with position values that are non-sequential or non-integer. Position must be 1, 2, 3 — not 0, 1, 2 and not 1.0, 2.0, 3.0.

**Article** schema with datePublished in a non-ISO 8601 format (e.g., "May 15, 2026" instead of "2026-05-15T00:00:00Z"). Dates must be ISO 8601 format; human-readable formats are rejected.

**Service** schema missing the required provider field or with provider.url pointing to a page that returns a non-200 status.

Each error should be recorded with the affected page type, the error message, and the fix required in the new site's template. Schema errors that exist in every page of a given type can be fixed once in the template rather than page by page.

## Phase 6: Accessibility Baseline {#accessibility-baseline}

An accessibility audit establishes the legal and ethical baseline for the rebuild. In the UK, the Equality Act 2010 and the Public Sector Bodies Accessibility Regulations impose legal obligations on certain site types. In the US, the Americans with Disabilities Act has been interpreted by courts to apply to commercial websites. An inaccessible new site creates legal liability that was not a consideration when the original site launched.

Use axe DevTools or Lighthouse accessibility scoring to audit a sample of pages from each page type. Record errors by WCAG 2.2 success criterion (not just by error message). Categorise by severity: Level A failures (must fix), Level AA failures (should fix), Level AAA failures (recommended).

Common findings: images without alt text, form inputs without associated labels, interactive elements with insufficient colour contrast, keyboard focus states that are invisible (typically removed by outline: none with no replacement), and ARIA attributes that are incorrectly nested or reference non-existent element IDs.

The rebuild is the correct time to establish a zero-tolerance policy for Level A and Level AA failures. Implementing this in CI (using axe-playwright or similar) ensures the new site does not accumulate accessibility debt from the first deployment.

## Producing the Ranked Remediation Backlog {#remediation-backlog}

The audit output is only as valuable as the backlog it produces. A findings report that engineers must interpret and estimate themselves is frequently left unactioned. A structured backlog with clear specifications and effort estimates is immediately executable.

For each finding, create a backlog item with: the finding description (what is wrong), the evidence (URL, screenshot, curl output, measurement), the impact category (Performance / SEO / Accessibility / Dependency Risk / Schema), the affected scope (all pages / specific page type / single page), the fix specification (what specifically must be done), and the effort estimate (hours, using a format the team agrees on).

Rank backlog items by the ratio of impact to effort. A finding that affects all pages, suppresses organic traffic, and can be fixed in two hours ranks above a finding that affects one page, has minor impact, and requires a day of work.

The backlog is the rebuild's starting definition of done. Every item in it must be addressed or explicitly de-scoped with documented rationale before the new platform is considered ready for launch.

## What to Preserve vs. What to Discard {#what-to-preserve}

The most consequential decision the audit produces is not a list of fixes — it is a list of what to carry forward. Every page, URL pattern, schema implementation, and dependency that survives into the new platform is a constraint on the new platform's architecture. Carry forward only what earns its place.

URLs that have accumulated inbound links and organic traffic earn their place through 301 redirects and canonical continuity. Content that still serves a genuine user intent earns its place through migration. Schema patterns that are correctly implemented and producing rich results in Search Console earn their place through template preservation.

Third-party scripts that have not been used in the past six months do not earn their place. Page designs that consistently produce high bounce rates without engagement metrics suggesting deliberate exit (reading an article then leaving) do not earn their place. URL structures that create canonical confusion or duplicate content do not earn their place.

The audit gives you permission to discard. Use it.`,
  },
];
