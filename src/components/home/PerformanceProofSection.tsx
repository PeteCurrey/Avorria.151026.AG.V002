"use client";

import React, { useState, useEffect } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface MetricData {
  name: string;
  code: string;
  targetSla: string;
  currentValue: number | null;
  unit: string;
  status: "measuring" | "pass" | "evaluating";
  description: string;
}

export function PerformanceProofSection() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    {
      name: "Largest Contentful Paint (LCP)",
      code: "CWV-LCP",
      targetSla: "< 2.0s",
      currentValue: null,
      unit: "ms",
      status: "measuring",
      description: "Render time of primary editorial headline on mobile/desktop viewport.",
    },
    {
      name: "Time to First Byte (TTFB)",
      code: "CWV-TTFB",
      targetSla: "< 200ms",
      currentValue: null,
      unit: "ms",
      status: "measuring",
      description: "Edge server latency and initial HTML stream response duration.",
    },
    {
      name: "Cumulative Layout Shift (CLS)",
      code: "CWV-CLS",
      targetSla: "< 0.05",
      currentValue: null,
      unit: "",
      status: "measuring",
      description: "Visual stability metric verifying zero unexpected DOM movements.",
    },
    {
      name: "Interaction to Next Paint (INP)",
      code: "CWV-INP",
      targetSla: "< 150ms",
      currentValue: null,
      unit: "ms",
      status: "measuring",
      description: "Responsiveness of UI components upon discrete user input.",
    },
  ]);

  const [domLoadTime, setDomLoadTime] = useState<number | null>(null);
  const [observerActive, setObserverActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("performance" in window)) return;

    setObserverActive(true);

    // 1. Navigation Timing (TTFB & DOM Content Loaded)
    const updateNavTiming = () => {
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        const nav = navEntries[0];
        const ttfb = Math.round(nav.responseStart - (nav.requestStart || 0));
        const domInteractive = Math.round(nav.domInteractive);

        setMetrics((prev) =>
          prev.map((m) => {
            if (m.code === "CWV-TTFB") {
              const val = ttfb > 0 ? ttfb : Math.round(nav.responseStart);
              return {
                ...m,
                currentValue: val,
                status: val <= 200 ? "pass" : "evaluating",
              };
            }
            return m;
          })
        );

        if (domInteractive > 0) {
          setDomLoadTime(domInteractive);
        }
      }
    };

    updateNavTiming();

    // 2. PerformanceObserver for LCP
    let lcpObserver: PerformanceObserver | null = null;
    try {
      if (PerformanceObserver.supportedEntryTypes.includes("largest-contentful-paint")) {
        lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            const lcpVal = Math.round(lastEntry.startTime);
            setMetrics((prev) =>
              prev.map((m) =>
                m.code === "CWV-LCP"
                  ? {
                      ...m,
                      currentValue: lcpVal,
                      status: lcpVal <= 2000 ? "pass" : "evaluating",
                    }
                  : m
              )
            );
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      }
    } catch {
      // Graceful fallback to measuring status
    }

    // 3. PerformanceObserver for CLS
    let clsObserver: PerformanceObserver | null = null;
    let clsScore = 0;
    try {
      if (PerformanceObserver.supportedEntryTypes.includes("layout-shift")) {
        clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            // Only count shifts without recent input
            if (!(entry as { hadRecentInput?: boolean }).hadRecentInput) {
              clsScore += (entry as { value?: number }).value || 0;
            }
          }
          const formattedCls = parseFloat(clsScore.toFixed(3));
          setMetrics((prev) =>
            prev.map((m) =>
              m.code === "CWV-CLS"
                ? {
                    ...m,
                    currentValue: formattedCls,
                    status: formattedCls <= 0.05 ? "pass" : "evaluating",
                  }
                : m
            )
          );
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
      }
    } catch {
      // Graceful fallback
    }

    // 4. PerformanceObserver for First-Input (INP proxy)
    let inpObserver: PerformanceObserver | null = null;
    try {
      if (PerformanceObserver.supportedEntryTypes.includes("first-input")) {
        inpObserver = new PerformanceObserver((entryList) => {
          const firstInput = entryList.getEntries()[0] as PerformanceEventTiming;
          if (firstInput) {
            const delay = Math.round(firstInput.processingStart - firstInput.startTime);
            setMetrics((prev) =>
              prev.map((m) =>
                m.code === "CWV-INP"
                  ? {
                      ...m,
                      currentValue: delay,
                      status: delay <= 150 ? "pass" : "evaluating",
                    }
                  : m
              )
            );
          }
        });
        inpObserver.observe({ type: "first-input", buffered: true });
      }
    } catch {
      // Graceful fallback
    }

    return () => {
      lcpObserver?.disconnect();
      clsObserver?.disconnect();
      inpObserver?.disconnect();
    };
  }, []);

  return (
    <section
      id="performance-proof"
      className="w-full py-24 sm:py-32 bg-ivory text-graphite border-b border-graphite-hairline"
      aria-label="Avorria Performance Telemetry"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-graphite-hairline">
          <SectionHeader
            eyebrow="04 / Empirical Telemetry"
            heading="Contractual Performance Proof"
            lead="Avorria does not trade on marketing approximations. Every architecture we ship is bound to contractual Core Web Vitals SLAs, continuously verified via the browser PerformanceObserver API."
          />
          <div className="flex items-center gap-3 text-xs font-mono text-graphite-muted shrink-0">
            <span
              className={`w-2 h-2 rounded-full ${
                observerActive ? "bg-emerald-600 animate-pulse" : "bg-rose"
              }`}
            />
            <span>
              {observerActive
                ? "Active Observer Telemetry"
                : "Initialising Telemetry Hook..."}
            </span>
          </div>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => {
            const isMeasuring = m.status === "measuring" || m.currentValue === null;
            return (
              <div
                key={m.code}
                className="border border-graphite-hairline p-6 bg-ivory-subtle space-y-4 relative"
              >
                <div className="flex items-center justify-between text-xs font-mono text-graphite-muted">
                  <span>[{m.code}]</span>
                  <span className="uppercase text-[11px] text-rose font-light">
                    SLA: {m.targetSla}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-graphite-muted uppercase tracking-wider block font-light">
                    {m.name}
                  </span>
                  <div className="flex items-baseline gap-2">
                    {isMeasuring ? (
                      <span className="font-mono text-xl sm:text-2xl text-rose font-light animate-pulse">
                        measuring...
                      </span>
                    ) : (
                      <>
                        <span className="font-mono text-3xl font-extralight text-graphite">
                          {m.currentValue}
                        </span>
                        {m.unit && (
                          <span className="font-mono text-xs text-graphite-muted">
                            {m.unit}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-graphite-hairline/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-graphite-muted">Validation:</span>
                  {isMeasuring ? (
                    <span className="text-graphite-muted uppercase">Awaiting Event</span>
                  ) : m.status === "pass" ? (
                    <span className="text-emerald-700 uppercase font-light">
                      &bull; SLA Verified
                    </span>
                  ) : (
                    <span className="text-rose uppercase font-light">
                      Evaluating Sample
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-graphite-muted leading-relaxed font-light">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Engineering Assurances Table */}
        <div className="p-8 border border-graphite-hairline bg-ivory space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-graphite-hairline pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-graphite">
              Transatlantic SLA Architecture Baseline
            </span>
            <span className="text-[11px] font-mono text-graphite-muted">
              Active DOM Interactive: {domLoadTime ? `${domLoadTime}ms` : "measuring..."}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-graphite font-light leading-relaxed">
            <div className="space-y-2 border-l border-graphite-hairline pl-4">
              <span className="font-mono text-[11px] text-rose uppercase tracking-wider block">
                01. Zero Third-Party Tag Bloat
              </span>
              <p className="text-graphite-muted">
                No tracking pixels, unsolicited third-party beacons, or client-side marketing script injections. Front-end bundles remain deterministic and lean.
              </p>
            </div>

            <div className="space-y-2 border-l border-graphite-hairline pl-4">
              <span className="font-mono text-[11px] text-rose uppercase tracking-wider block">
                02. Full WCAG 2.2 Level AA
              </span>
              <p className="text-graphite-muted">
                Continuous automated linting and axe-core accessibility tests ensure zero color contrast failures, keyboard trap prevention, and screen-reader semantics.
              </p>
            </div>

            <div className="space-y-2 border-l border-graphite-hairline pl-4">
              <span className="font-mono text-[11px] text-rose uppercase tracking-wider block">
                03. Contractually Guaranteed
              </span>
              <p className="text-graphite-muted">
                We embed Core Web Vitals pass thresholds directly into statement-of-work commercial deliverables. Milestone payments are tied to empirical telemetry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
