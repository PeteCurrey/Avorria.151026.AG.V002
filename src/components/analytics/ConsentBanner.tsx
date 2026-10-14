"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function ConsentBanner() {
  const [consentStatus, setConsentStatus] = useState<"pending" | "granted" | "denied">("pending");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("avorria_consent_choice");
    if (saved === "granted" || saved === "denied") {
      setConsentStatus(saved);
    }
  }, []);

  const handleChoice = (choice: "granted" | "denied") => {
    localStorage.setItem("avorria_consent_choice", choice);
    setConsentStatus(choice);
  };

  return (
    <>
      {/* Vercel Speed Insights for real-user Core Web Vitals telemetry (Privacy-preserving, zero third-party cookie) */}
      <SpeedInsights />

      {/* GA4 Script Loaded ONLY After Explicit Consent (PECR / UK GDPR compliant) */}
      {consentStatus === "granted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                anonymize_ip: true,
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Consent Notice - Shown ONLY if choice has not been recorded */}
      {mounted && consentStatus === "pending" && (
        <aside
          role="region"
          aria-label="Privacy & Telemetry Preferences"
          className="fixed bottom-0 inset-x-0 z-50 bg-ivory border-t border-graphite-hairline p-4 sm:p-6 shadow-2xl transition-all"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
                <span className="text-[11px] uppercase tracking-widest text-graphite font-light">
                  Privacy &amp; Telemetry Notice
                </span>
              </div>
              <p className="text-xs text-graphite-muted font-light leading-relaxed">
                Avorria operates zero tracking cookies by default. We request your consent to gather anonymous performance and telemetry analytics in accordance with UK PECR and US data privacy frameworks.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleChoice("denied")}
                className="px-4 py-2 border border-graphite-hairline text-graphite text-xs uppercase tracking-wider font-light hover:border-graphite transition-colors"
              >
                Decline All
              </button>
              <button
                type="button"
                onClick={() => handleChoice("granted")}
                className="px-5 py-2 bg-graphite text-ivory text-xs uppercase tracking-wider font-light hover:bg-rose transition-colors"
              >
                Accept Telemetry
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
