import { z } from "zod";

export const AuditRequestSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  organization: z.string().min(2, "Organization name must be at least 2 characters").max(120),
  workEmail: z.string().email("A valid corporate email address is required"),
  targetUrl: z.string().url("A valid website URL is required (e.g., https://example.com)"),
  currentStack: z.enum([
    "Next.js (App Router / Pages)",
    "Vite / React SPA",
    "WordPress / VIP",
    "Shopify Plus / Headless",
    "Ruby on Rails / Django / PHP",
    "Legacy Enterprise Monolith",
    "Other / Unknown",
  ]),
  primaryFocus: z.enum([
    "Core Web Vitals & Sub-Second LCP Remediation",
    "Transatlantic Technical SEO & Hreflang Conflict Audit",
    "Pre-Rebuild Systems Architecture & Technology Evaluation",
    "Enterprise AI Workflow Readiness & Data Integrity",
  ]),
  notes: z.string().max(1000).optional().or(z.literal("")),
  jurisdiction: z.enum(["United Kingdom", "United States", "Other / International"]),
  website_hp: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  market: z.enum(["UK", "US"]).optional(),
});

export type AuditRequestData = z.infer<typeof AuditRequestSchema>;

export interface AuditResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Record<string, string[]>;
}
