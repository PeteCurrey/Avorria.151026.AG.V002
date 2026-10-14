import { z } from "zod";

export const InquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  organization: z.string().min(2, "Organization name must be at least 2 characters").max(120),
  workEmail: z.string().email("A valid corporate email address is required"),
  jurisdiction: z.enum(["United Kingdom", "United States", "Other / International"]),
  engagementType: z.enum([
    "High-Performance Web Architecture (Next.js / Vite)",
    "Enterprise AI Systems & Agentic Orchestration",
    "Architecture Audit & Core Web Vitals Remediation",
    "General Executive Advisory",
  ]),
  projectTimeline: z.enum(["Immediate (Next 30 Days)", "Quarterly Planning (1-3 Months)", "Strategic Advisory"]),
  overview: z.string().min(15, "Please provide an overview of at least 15 characters").max(2000),
});

export type InquiryFormData = z.infer<typeof InquirySchema>;

export interface InquiryResponse {
  success: boolean;
  message: string;
  referenceId?: string;
  errors?: Record<string, string[]>;
}
