"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuditRequestSchema, type AuditRequestData } from "@/content/audits";

interface AuditFormProps {
  market?: "UK" | "US";
}

export function AuditForm({ market = "UK" }: AuditFormProps) {
  const router = useRouter();
  const initialJurisdiction =
    market === "US" ? "United States" : "United Kingdom";

  const [formData, setFormData] = useState<AuditRequestData>({
    fullName: "",
    organization: "",
    workEmail: "",
    targetUrl: "",
    currentStack: "Next.js (App Router / Pages)",
    primaryFocus: "Core Web Vitals & Sub-Second LCP Remediation",
    notes: "",
    jurisdiction: initialJurisdiction,
    website_hp: "",
    market,
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);
    setFieldErrors({});

    const clientValidation = AuditRequestSchema.safeParse(formData);
    if (!clientValidation.success) {
      setFieldErrors(clientValidation.error.flatten().fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const prefix = market === "US" ? "/us" : "";
        router.push(
          `${prefix}/audit/confirmed?ref=${encodeURIComponent(
            data.referenceId || "AVR-AUDIT-SUBMITTED"
          )}&target=${encodeURIComponent(formData.targetUrl)}`
        );
      } else {
        setErrorMessage(data.message || "Failed to schedule audit.");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      }
    } catch {
      setErrorMessage(
        "Network connection failed. Please contact audits@avorria.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory border border-graphite-hairline p-8 sm:p-12 transition-all">
      <div className="pb-8 hairline-b mb-8 space-y-2">
        <span className="text-xs font-mono text-rose uppercase tracking-widest block">
          Diagnostic Intake &middot; {market === "US" ? "New York Hub" : "London Hub"}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extralight text-graphite tracking-tight">
          Request an Architectural Site Audit
        </h3>
        <p className="text-xs sm:text-sm font-light text-graphite-muted leading-relaxed">
          Complimentary, no-obligation evaluation of your production platform. Telemetry conducted under throttled cellular conditions and deep crawl inspection.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Hidden honeypot field */}
        <div style={{ display: "none" }} aria-hidden="true" className="hidden">
          <label htmlFor="website_hp">Leave this empty</label>
          <input
            type="text"
            id="website_hp"
            name="website_hp"
            value={formData.website_hp || ""}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {errorMessage && (
          <div
            className="p-4 border border-rose/30 bg-rose/5 text-xs font-mono text-rose"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {/* Target URL */}
        <div className="space-y-2">
          <label
            htmlFor="targetUrl"
            className="block text-xs font-mono uppercase tracking-wider text-graphite"
          >
            Target Website URL to Audit <span className="text-rose">*</span>
          </label>
          <input
            type="url"
            id="targetUrl"
            name="targetUrl"
            value={formData.targetUrl}
            onChange={handleChange}
            placeholder="https://platform.enterprise.com"
            aria-required="true"
            aria-invalid={!!fieldErrors.targetUrl}
            aria-describedby={fieldErrors.targetUrl ? "targetUrl-error" : undefined}
            className={`w-full px-4 py-3 bg-white border text-xs font-mono text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-rose transition-colors ${
              fieldErrors.targetUrl ? "border-rose" : "border-graphite-hairline"
            }`}
          />
          {fieldErrors.targetUrl && (
            <p id="targetUrl-error" className="text-[11px] font-mono text-rose">
              {fieldErrors.targetUrl[0]}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-xs font-mono uppercase tracking-wider text-graphite"
            >
              Your Name <span className="text-rose">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Marcus Sterling"
              aria-required="true"
              aria-invalid={!!fieldErrors.fullName}
              aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              className={`w-full px-4 py-3 bg-white border text-xs font-light text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-rose transition-colors ${
                fieldErrors.fullName ? "border-rose" : "border-graphite-hairline"
              }`}
            />
            {fieldErrors.fullName && (
              <p id="fullName-error" className="text-[11px] font-mono text-rose">
                {fieldErrors.fullName[0]}
              </p>
            )}
          </div>

          {/* Corporate Entity */}
          <div className="space-y-2">
            <label
              htmlFor="organization"
              className="block text-xs font-mono uppercase tracking-wider text-graphite"
            >
              Organization / Company <span className="text-rose">*</span>
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Sterling Capital Markets"
              aria-required="true"
              aria-invalid={!!fieldErrors.organization}
              aria-describedby={
                fieldErrors.organization ? "organization-error" : undefined
              }
              className={`w-full px-4 py-3 bg-white border text-xs font-light text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-rose transition-colors ${
                fieldErrors.organization
                  ? "border-rose"
                  : "border-graphite-hairline"
              }`}
            />
            {fieldErrors.organization && (
              <p id="organization-error" className="text-[11px] font-mono text-rose">
                {fieldErrors.organization[0]}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Work Email */}
          <div className="space-y-2">
            <label
              htmlFor="workEmail"
              className="block text-xs font-mono uppercase tracking-wider text-graphite"
            >
              Corporate Work Email <span className="text-rose">*</span>
            </label>
            <input
              type="email"
              id="workEmail"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleChange}
              placeholder="m.sterling@sterlingcap.com"
              aria-required="true"
              aria-invalid={!!fieldErrors.workEmail}
              aria-describedby={
                fieldErrors.workEmail ? "workEmail-error" : undefined
              }
              className={`w-full px-4 py-3 bg-white border text-xs font-light text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-rose transition-colors ${
                fieldErrors.workEmail ? "border-rose" : "border-graphite-hairline"
              }`}
            />
            {fieldErrors.workEmail && (
              <p id="workEmail-error" className="text-[11px] font-mono text-rose">
                {fieldErrors.workEmail[0]}
              </p>
            )}
          </div>

          {/* Operational Jurisdiction */}
          <div className="space-y-2">
            <label
              htmlFor="jurisdiction"
              className="block text-xs font-mono uppercase tracking-wider text-graphite"
            >
              Primary Market <span className="text-rose">*</span>
            </label>
            <select
              id="jurisdiction"
              name="jurisdiction"
              value={formData.jurisdiction}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-graphite-hairline text-xs font-light text-graphite focus:outline-none focus:border-rose transition-colors"
            >
              <option value="United Kingdom">United Kingdom (London Hub)</option>
              <option value="United States">United States (New York Hub)</option>
              <option value="Other / International">Other / International</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Current Stack */}
          <div className="space-y-2">
            <label
              htmlFor="currentStack"
              className="block text-xs font-mono uppercase tracking-wider text-graphite"
            >
              Current Technology Stack <span className="text-rose">*</span>
            </label>
            <select
              id="currentStack"
              name="currentStack"
              value={formData.currentStack}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-graphite-hairline text-xs font-light text-graphite focus:outline-none focus:border-rose transition-colors"
            >
              <option value="Next.js (App Router / Pages)">
                Next.js (App Router / Pages)
              </option>
              <option value="Vite / React SPA">Vite / React SPA</option>
              <option value="WordPress / VIP">WordPress / VIP</option>
              <option value="Shopify Plus / Headless">Shopify Plus / Headless</option>
              <option value="Ruby on Rails / Django / PHP">
                Ruby on Rails / Django / PHP
              </option>
              <option value="Legacy Enterprise Monolith">
                Legacy Enterprise Monolith
              </option>
              <option value="Other / Unknown">Other / Unknown</option>
            </select>
          </div>

          {/* Primary Audit Focus */}
          <div className="space-y-2">
            <label
              htmlFor="primaryFocus"
              className="block text-xs font-mono uppercase tracking-wider text-graphite"
            >
              Primary Diagnostic Focus <span className="text-rose">*</span>
            </label>
            <select
              id="primaryFocus"
              name="primaryFocus"
              value={formData.primaryFocus}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-graphite-hairline text-xs font-light text-graphite focus:outline-none focus:border-rose transition-colors"
            >
              <option value="Core Web Vitals & Sub-Second LCP Remediation">
                Core Web Vitals &amp; Sub-Second LCP Remediation
              </option>
              <option value="Transatlantic Technical SEO & Hreflang Conflict Audit">
                Transatlantic Technical SEO &amp; Hreflang Conflict Audit
              </option>
              <option value="Pre-Rebuild Systems Architecture & Technology Evaluation">
                Pre-Rebuild Systems Architecture &amp; Technology Evaluation
              </option>
              <option value="Enterprise AI Workflow Readiness & Data Integrity">
                Enterprise AI Workflow Readiness &amp; Data Integrity
              </option>
            </select>
          </div>
        </div>

        {/* Optional Context / Bottlenecks */}
        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="block text-xs font-mono uppercase tracking-wider text-graphite"
          >
            Known Architectural Constraints or Symptoms (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={formData.notes || ""}
            onChange={handleChange}
            placeholder="e.g. Mobile LCP spikes above 3.5s on product pages; unmeasured third-party scripts causing main-thread long tasks..."
            className="w-full px-4 py-3 bg-white border border-graphite-hairline text-xs font-light text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-rose transition-colors"
          />
        </div>

        {/* SLA & Methodology Notice */}
        <div className="p-4 border border-graphite-hairline bg-ivory-subtle text-xs font-mono text-graphite-muted space-y-1">
          <div className="text-graphite font-normal">Audit SLA Commitment:</div>
          <div>
            Preliminary baseline crawl completed within <strong>48 business hours</strong>. All diagnostic findings delivered directly to technical leadership with zero sales rep mediation.
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-3.5 bg-graphite text-ivory text-xs font-mono uppercase tracking-wider hover:bg-rose transition-colors disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Initiating Audit..." : "Commission Free Diagnostic &rarr;"}
          </button>
          <span className="text-[11px] font-mono text-graphite-muted">
            Confidentiality guaranteed &middot; No spam
          </span>
        </div>
      </form>
    </div>
  );
}
