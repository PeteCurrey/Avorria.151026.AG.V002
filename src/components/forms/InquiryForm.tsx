"use client";

import React, { useState } from "react";
import { InquirySchema, type InquiryFormData } from "@/content/inquiries";

const INITIAL_DATA: InquiryFormData = {
  fullName: "",
  organization: "",
  workEmail: "",
  jurisdiction: "United Kingdom",
  engagementType: "High-Performance Web Architecture (Next.js / Vite)",
  projectTimeline: "Quarterly Planning (1-3 Months)",
  overview: "",
};

export function InquiryForm() {
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

    const clientValidation = InquirySchema.safeParse(formData);
    if (!clientValidation.success) {
      setFieldErrors(clientValidation.error.flatten().fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResultMessage(data.message);
        setReferenceId(data.referenceId);
        setFormData(INITIAL_DATA);
      } else {
        setResultMessage(data.message || "Unable to submit inquiry.");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
      }
    } catch (err) {
      setResultMessage("Network error. Please try again or email partner@avorria.com directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory border border-graphite-hairline p-8 sm:p-12 transition-all">
      <div className="pb-8 hairline-b mb-8">
        <span className="text-xs font-light text-rose uppercase tracking-widest block mb-1">
          Direct Transmission
        </span>
        <h3 className="text-2xl sm:text-3xl font-light text-graphite tracking-tight-display">
          Enterprise Engagement Inquiry
        </h3>
        <p className="text-sm font-light text-graphite-muted mt-2">
          Submissions are reviewed directly by technical leadership in London and New York under mutual confidentiality.
        </p>
      </div>

      {referenceId ? (
        <div
          className="p-8 border border-graphite-hairline bg-ivory-subtle space-y-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose inline-block" />
            <span className="text-xs uppercase tracking-widest text-graphite font-light">
              Transmission Confirmed
            </span>
          </div>
          <p className="text-sm font-light text-graphite leading-relaxed">
            {resultMessage}
          </p>
          <div className="pt-2 text-xs font-light text-graphite-muted border-t border-graphite-hairline">
            Reference Identifier: <span className="text-graphite font-mono">{referenceId}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setReferenceId(null);
              setResultMessage(null);
            }}
            className="text-xs font-light text-rose hover:underline pt-2 block"
          >
            Submit an additional inquiry &rarr;
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-graphite-muted mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Jonathan Vance"
                className="w-full bg-transparent border border-graphite-hairline px-4 py-3 text-sm text-graphite placeholder:text-graphite-muted/50 focus:border-graphite focus:outline-none"
                aria-invalid={Boolean(fieldErrors.fullName)}
                aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              />
              {fieldErrors.fullName && (
                <p id="fullName-error" className="text-xs text-rose mt-1">
                  {fieldErrors.fullName[0]}
                </p>
              )}
            </div>

            {/* Organization */}
            <div>
              <label htmlFor="organization" className="block text-xs uppercase tracking-wider text-graphite-muted mb-2">
                Organization / Firm *
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                required
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. Vance Institutional Capital"
                className="w-full bg-transparent border border-graphite-hairline px-4 py-3 text-sm text-graphite placeholder:text-graphite-muted/50 focus:border-graphite focus:outline-none"
                aria-invalid={Boolean(fieldErrors.organization)}
                aria-describedby={fieldErrors.organization ? "organization-error" : undefined}
              />
              {fieldErrors.organization && (
                <p id="organization-error" className="text-xs text-rose mt-1">
                  {fieldErrors.organization[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Work Email */}
            <div>
              <label htmlFor="workEmail" className="block text-xs uppercase tracking-wider text-graphite-muted mb-2">
                Corporate Email *
              </label>
              <input
                id="workEmail"
                name="workEmail"
                type="email"
                required
                value={formData.workEmail}
                onChange={handleChange}
                placeholder="e.g. j.vance@firm.com"
                className="w-full bg-transparent border border-graphite-hairline px-4 py-3 text-sm text-graphite placeholder:text-graphite-muted/50 focus:border-graphite focus:outline-none"
                aria-invalid={Boolean(fieldErrors.workEmail)}
                aria-describedby={fieldErrors.workEmail ? "workEmail-error" : undefined}
              />
              {fieldErrors.workEmail && (
                <p id="workEmail-error" className="text-xs text-rose mt-1">
                  {fieldErrors.workEmail[0]}
                </p>
              )}
            </div>

            {/* Jurisdiction */}
            <div>
              <label htmlFor="jurisdiction" className="block text-xs uppercase tracking-wider text-graphite-muted mb-2">
                Jurisdiction *
              </label>
              <select
                id="jurisdiction"
                name="jurisdiction"
                value={formData.jurisdiction}
                onChange={handleChange}
                className="w-full bg-ivory border border-graphite-hairline px-4 py-3 text-sm text-graphite focus:border-graphite focus:outline-none"
              >
                <option value="United Kingdom">United Kingdom (London Hub)</option>
                <option value="United States">United States (New York Hub)</option>
                <option value="Other / International">Other / International</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Engagement Type */}
            <div>
              <label htmlFor="engagementType" className="block text-xs uppercase tracking-wider text-graphite-muted mb-2">
                Mandate Focus *
              </label>
              <select
                id="engagementType"
                name="engagementType"
                value={formData.engagementType}
                onChange={handleChange}
                className="w-full bg-ivory border border-graphite-hairline px-4 py-3 text-sm text-graphite focus:border-graphite focus:outline-none"
              >
                <option value="High-Performance Web Architecture (Next.js / Vite)">
                  High-Performance Web Architecture (Next.js / Vite)
                </option>
                <option value="Enterprise AI Systems & Agentic Orchestration">
                  Enterprise AI Systems & Agentic Orchestration
                </option>
                <option value="Architecture Audit & Core Web Vitals Remediation">
                  Architecture Audit & Core Web Vitals Remediation
                </option>
                <option value="General Executive Advisory">General Executive Advisory</option>
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label htmlFor="projectTimeline" className="block text-xs uppercase tracking-wider text-graphite-muted mb-2">
                Target Timeline *
              </label>
              <select
                id="projectTimeline"
                name="projectTimeline"
                value={formData.projectTimeline}
                onChange={handleChange}
                className="w-full bg-ivory border border-graphite-hairline px-4 py-3 text-sm text-graphite focus:border-graphite focus:outline-none"
              >
                <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                <option value="Quarterly Planning (1-3 Months)">Quarterly Planning (1-3 Months)</option>
                <option value="Strategic Advisory">Strategic Advisory / Long-Term</option>
              </select>
            </div>
          </div>

          {/* Overview */}
          <div>
            <label htmlFor="overview" className="block text-xs uppercase tracking-wider text-graphite-muted mb-2">
              Mandate Specifications & Objectives *
            </label>
            <textarea
              id="overview"
              name="overview"
              rows={4}
              required
              value={formData.overview}
              onChange={handleChange}
              placeholder="Outline project scope, existing technical stack, key constraints, and performance requirements..."
              className="w-full bg-transparent border border-graphite-hairline px-4 py-3 text-sm text-graphite placeholder:text-graphite-muted/50 focus:border-graphite focus:outline-none"
              aria-invalid={Boolean(fieldErrors.overview)}
              aria-describedby={fieldErrors.overview ? "overview-error" : undefined}
            />
            {fieldErrors.overview && (
              <p id="overview-error" className="text-xs text-rose mt-1">
                {fieldErrors.overview[0]}
              </p>
            )}
          </div>

          {resultMessage && !referenceId && (
            <p className="text-xs text-rose" role="alert">
              {resultMessage}
            </p>
          )}

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs text-graphite-muted font-light">
              Enterprise confidentiality guaranteed &middot; No marketing solicitations
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3.5 bg-graphite text-ivory text-xs uppercase tracking-widest font-light hover:bg-rose transition-colors duration-200 focus-visible:outline-rose disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Transmitting..." : "Submit Mandate Inquiry"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
