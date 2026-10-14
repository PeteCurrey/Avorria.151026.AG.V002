import React from "react";
import type { Metadata } from "next";
import { OFFICE_PRESENCES } from "@/content/standards";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "Executive Inquiries & Contact",
  description:
    "Direct communication channel for enterprise mandates in the United Kingdom and United States. Connect with Avorria technical leadership.",
  alternates: {
    canonical: "https://avorria.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
      {/* Page Header */}
      <section className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
          <span className="text-xs uppercase tracking-widest text-rose font-light">
            Direct Transmission
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extralight text-graphite tracking-tighter-display">
          Executive Inquiries &amp; Mandate Initiation
        </h1>
        <p className="text-base sm:text-lg text-graphite-muted font-light leading-relaxed">
          Avorria partners with enterprise leadership in London, New York, and internationally. All project discussions are held under strict mutual confidentiality.
        </p>
      </section>

      {/* Grid: Office Details & Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Office Presence & Security Details */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-graphite-muted font-light">
              Operational Hubs
            </h2>
            <div className="space-y-6">
              {OFFICE_PRESENCES.map((office) => (
                <div
                  key={office.code}
                  className="border border-graphite-hairline p-6 bg-ivory space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-light text-graphite">
                      {office.city} [{office.code}]
                    </span>
                    <span className="text-xs font-mono text-rose">
                      {office.status}
                    </span>
                  </div>
                  <p className="text-xs font-light text-graphite-muted">
                    Jurisdiction: {office.jurisdiction}
                  </p>
                  <p className="text-xs font-light text-graphite-muted/90 pt-1">
                    {office.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-graphite-hairline p-6 bg-ivory-subtle space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-graphite font-light">
              Direct Partner Channel
            </h3>
            <p className="text-xs text-graphite-muted font-light leading-relaxed">
              For priority institutional or urgent architecture remediation inquiries:
            </p>
            <a
              href="mailto:partner@avorria.com"
              className="text-sm text-rose font-light hover:underline block"
            >
              partner@avorria.com
            </a>
            <div className="pt-2 text-[11px] text-graphite-muted font-mono border-t border-graphite-hairline">
              PGP Key Available Upon Request
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
}
