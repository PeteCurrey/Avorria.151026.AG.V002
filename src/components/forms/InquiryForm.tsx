"use client";

import React, { useState, useEffect } from "react";
import { InquirySchema, type InquiryFormData } from "@/content/inquiries";

interface InquiryFormProps {
  market?: "UK" | "US";
}

export function InquiryForm({ market = "UK" }: InquiryFormProps) {
  const initialJurisdiction =
    market === "US" ? "United States" : "United Kingdom";

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: "",
    organization: "",
    workEmail: "",
    jurisdiction: initialJurisdiction,
    engagementType: "High-Performance Web Architecture (Next.js / Vite)",
    projectTimeline: "Quarterly Planning (1-3 Months)",
    overview: "",
    website_hp: "",
    market,
  });

  const [submitting, setSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // Cloudflare Turnstile loader (if site key configured)
  useEffect(() => {
    if (!siteKey || typeof window === "undefined") return;

    const scriptId = "cf-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    (window as any).onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
    };
  }, [siteKey]);

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
    setResultMessage(null);
    setReferenceId(null);
    setFieldErrors({});

    const payload = {
      ...formData,
      turnstileToken: turnstileToken || undefined,
    };

    const clientValidation = InquirySchema.safeParse(payload);
    if (!clientValidation.success) {
      setFieldErrors(clientValidation.error.flatten().fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResultMessage(data.message);
        setReferenceId(data.referenceId);
        setFormData({
          fullName: "",
          organization: "",
          workEmail: "",
          jurisdiction: initialJurisdiction,
          engagementType: "High-Performance Web Architecture (Next.js / Vite)",
          projectTimeline: "Quarterly Planning (1-3 Months)",
          overview: "",
          website_hp: "",
          market,
        });
      } else {
        setResultMessage(data.message || "Unable to submit inquiry.");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      }
    } catch {
      setResultMessage(
        "Network transmission error. Please contact london@avorria.com or newyork@avorria.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory border border-graphite-hairline p-8 sm:p-12 transition-all">
      <div className="pb-8 hairline-b mb-8 space-y-2">
        <span className="text-xs font-mono text-rose uppercase tracking-widest block">
          Direct Transmission &middot; {market === "US" ? "New York Hub" : "London Hub"}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extralight text-graphite tracking-tight">
          Executive Mandate Inquiry
        </h3>
        <p className="text-xs sm:text-sm font-light text-graphite-muted leading-relaxed">
          Submissions are reviewed directly by technical leadership in London and New York under mutual confidentiality.
        </p>
      </div>

      {referenceId ? (
        <div
          className="p-8 border border-graphite-hairline bg-ivory-subtle space-y-6"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose inline-block" />
            <span className="text-xs uppercase tracking-widest text-graphite font-mono">
              Transmission Confirmed &middot; {referenceId}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xl font-light text-graphite">
              Mandate Specifications Registered
            </h4>
            <p className="text-sm font-light text-graphite-muted leading-relaxed">
              {resultMessage}
            </p>
          </div>

          <div className="p-4 bg-white border border-graphite-hairline text-xs font-mono text-graphite space-y-1">
            <div className="text-rose font-medium">SLA Commitment:</div>
            <div>
              Direct partner response confirmed within <strong>one business day</strong> (guaranteed by Pete Currey, Technical Director).
            </div>
          </div>

          <button
            onClick={() => setReferenceId(null)}
            className="text-xs font-mono text-rose hover:underline"
          >
            &larr; Submit Another Specification
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot field (hidden from real users, traps automated bots) */}
          <div
            style={{ display: "none" }}
            aria-hidden="true"
            className="hidden"
          >
            <label htmlFor="website_hp">Leave this field blank</label>
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

          {resultMessage && !referenceId && (
            <div
              className="p-4 border border-rose/30 bg-rose/5 text-xs font-mono text-rose"
              role="alert"
            >
              {resultMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-xs font-mono uppercase tracking-wider text-graphite"
              >
                Lead Architect / Executive Name <span className="text-rose">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Dr. Eleanor Vance"
                aria-required="true"
                aria-invalid={!!fieldErrors.fullName}
                aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                className={`w-full px-4 py-3 bg-white border text-xs font-light text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-rose transition-colors ${
                  fieldErrors.fullName
                    ? "border-rose"
                    : "border-graphite-hairline"
                }`}
              />
              {fieldErrors.fullName && (
                <p id="fullName-error" className="text-[11px] font-mono text-rose">
                  {fieldErrors.fullName[0]}
                </p>
              )}
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label
                htmlFor="organization"
                className="block text-xs font-mono uppercase tracking-wider text-graphite"
              >
                Corporate Entity / Institution <span className="text-rose">*</span>
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Vance Financial Group"
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
                Corporate Email Address <span className="text-rose">*</span>
              </label>
              <input
                type="email"
                id="workEmail"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="e.vance@vancefinancial.com"
                aria-required="true"
                aria-invalid={!!fieldErrors.workEmail}
                aria-describedby={
                  fieldErrors.workEmail ? "workEmail-error" : undefined
                }
                className={`w-full px-4 py-3 bg-white border text-xs font-light text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-rose transition-colors ${
                  fieldErrors.workEmail
                    ? "border-rose"
                    : "border-graphite-hairline"
                }`}
              />
              {fieldErrors.workEmail && (
                <p id="workEmail-error" className="text-[11px] font-mono text-rose">
                  {fieldErrors.workEmail[0]}
                </p>
              )}
            </div>

            {/* Jurisdiction / Market Routing */}
            <div className="space-y-2">
              <label
                htmlFor="jurisdiction"
                className="block text-xs font-mono uppercase tracking-wider text-graphite"
              >
                Operational Jurisdiction <span className="text-rose">*</span>
              </label>
              <select
                id="jurisdiction"
                name="jurisdiction"
                value={formData.jurisdiction}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-graphite-hairline text-xs font-light text-graphite focus:outline-none focus:border-rose transition-colors"
              >
                <option value="United Kingdom">United Kingdom (London Hub / English Law)</option>
                <option value="United States">United States (New York Hub / US Law)</option>
                <option value="Other / International">Other / Cross-Border Mandate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Engagement Type */}
            <div className="space-y-2">
              <label
                htmlFor="engagementType"
                className="block text-xs font-mono uppercase tracking-wider text-graphite"
              >
                Discipline / Architecture Focus <span className="text-rose">*</span>
              </label>
              <select
                id="engagementType"
                name="engagementType"
                value={formData.engagementType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-graphite-hairline text-xs font-light text-graphite focus:outline-none focus:border-rose transition-colors"
              >
                <option value="High-Performance Web Architecture (Next.js / Vite)">
                  High-Performance Web Architecture (Next.js / Vite)
                </option>
                <option value="Enterprise AI Systems & Agentic Orchestration">
                  Enterprise AI Systems &amp; Agentic Orchestration
                </option>
                <option value="Architecture Audit & Core Web Vitals Remediation">
                  Architecture Audit &amp; Core Web Vitals Remediation
                </option>
                <option value="General Executive Advisory">
                  General Executive Advisory
                </option>
              </select>
            </div>

            {/* Project Timeline */}
            <div className="space-y-2">
              <label
                htmlFor="projectTimeline"
                className="block text-xs font-mono uppercase tracking-wider text-graphite"
              >
                Deployment Horizon <span className="text-rose">*</span>
              </label>
              <select
                id="projectTimeline"
                name="projectTimeline"
                value={formData.projectTimeline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-graphite-hairline text-xs font-light text-graphite focus:outline-none focus:border-rose transition-colors"
              >
                <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                <option value="Quarterly Planning (1-3 Months)">Quarterly Planning (1-3 Months)</option>
                <option value="Strategic Advisory">Strategic Advisory / Scoping</option>
              </select>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <label
              htmlFor="overview"
              className="block text-xs font-mono uppercase tracking-wider text-graphite"
            >
              Mandate Specifications &amp; Requirements <span className="text-rose">*</span>
            </label>
            <textarea
              id="overview"
              name="overview"
              rows={5}
              value={formData.overview}
              onChange={handleChange}
              placeholder="Outline target platform requirements, existing latency constraints, or AI compliance parameters..."
              aria-required="true"
              aria-invalid={!!fieldErrors.overview}
              aria-describedby={fieldErrors.overview ? "overview-error" : undefined}
              className={`w-full px-4 py-3 bg-white border text-xs font-light text-graphite placeholder:text-graphite-muted/50 focus:outline-none focus:border-rose transition-colors ${
                fieldErrors.overview
                  ? "border-rose"
                  : "border-graphite-hairline"
              }`}
            />
            {fieldErrors.overview && (
              <p id="overview-error" className="text-[11px] font-mono text-rose">
                {fieldErrors.overview[0]}
              </p>
            )}
          </div>

          {/* Cloudflare Turnstile Widget Placeholder if configured */}
          {siteKey && (
            <div
              className="cf-turnstile my-4"
              data-sitekey={siteKey}
              data-callback="onTurnstileSuccess"
            />
          )}

          {/* SLA Commitment Callout */}
          <div className="p-4 border border-graphite-hairline bg-ivory-subtle text-xs font-mono text-graphite-muted flex items-start gap-3">
            <span className="text-rose text-sm font-bold">&middot;</span>
            <div className="space-y-1">
              <div className="text-graphite font-normal">
                Direct Executive SLA:
              </div>
              <div>
                Response within <strong>one business day</strong> confirmed by Pete Currey, Technical Director. Transmissions routed under mutual NDA.
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-graphite text-ivory text-xs font-mono uppercase tracking-wider hover:bg-rose transition-colors disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Registering Mandate..." : "Transmit Mandate Specification &rarr;"}
            </button>
            <span className="text-[11px] font-mono text-graphite-muted">
              Strict privacy &middot; Zero marketing syndication
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
