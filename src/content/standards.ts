export interface EngineeringStandard {
  category: string;
  metric: string;
  threshold: string;
  enforcement: string;
  rationale: string;
}

export const ENGINEERING_STANDARDS: EngineeringStandard[] = [
  {
    category: "Core Web Vitals",
    metric: "Largest Contentful Paint (LCP)",
    threshold: "< 2.0s (Mobile 4G throttled)",
    enforcement: "Server Components, zero-blocking hero typography, lazy-loaded 3D layers",
    rationale: "Enterprise clients demand instant perceived velocity. Critical editorial copy must paint before non-critical visual scripts initialize.",
  },
  {
    category: "Core Web Vitals",
    metric: "Interaction to Next Paint (INP)",
    threshold: "< 150ms",
    enforcement: "Zero long tasks during user gestures, off-main-thread computation, lightweight handlers",
    rationale: "Smooth, immediate feedback across all interactive controls and navigation pathways.",
  },
  {
    category: "Core Web Vitals",
    metric: "Cumulative Layout Shift (CLS)",
    threshold: "< 0.02",
    enforcement: "Explicit aspect-ratios, reserved canvas boundaries, static font metric overrides",
    rationale: "Prevents jarring layout recalculations and visual instability during load.",
  },
  {
    category: "Motion & Animation",
    metric: "Scroll & Scrub Pipeline",
    threshold: "60-120fps sync via Lenis + GSAP",
    enforcement: "ScrollTrigger scrub, transform/opacity only, prefers-reduced-motion static fallback",
    rationale: "Immersive interaction without battery drain or layout thrashing.",
  },
  {
    category: "Accessibility",
    metric: "WCAG Compliance",
    threshold: "WCAG 2.2 Level AA",
    enforcement: "Automated axe-core regression tests, keyboard-operable flows, contrast ratios >= 4.5:1",
    rationale: "Inclusivity is an executive mandate; all corporate platforms must be accessible to all users.",
  },
  {
    category: "Code Integrity",
    metric: "Type Safety",
    threshold: "TypeScript Strict (100%)",
    enforcement: "noImplicitAny, exactOptionalPropertyTypes, Zod runtime schema boundaries",
    rationale: "Eliminates entire classes of runtime exceptions and maintains long-term codebase maintainability.",
  },
];

export interface OfficePresence {
  region: string;
  code: string;
  city: string;
  jurisdiction: string;
  status: string;
  focus: string;
}

export const OFFICE_PRESENCES: OfficePresence[] = [
  {
    region: "United Kingdom",
    code: "LON",
    city: "London",
    jurisdiction: "England & Wales",
    status: "Active Operational Hub",
    focus: "European Client Engagements, Financial Services & Next.js Platforms",
  },
  {
    region: "United States",
    code: "NYC",
    city: "New York",
    jurisdiction: "Delaware / New York",
    status: "Active Operational Hub",
    focus: "North American Enterprise Systems, Regulatory AI & Production Platforms",
  },
];
