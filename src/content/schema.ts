import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  code: z.string().min(1),
  title: z.string().min(3),
  category: z.enum(["Web Platforms", "AI Systems", "Performance Engineering", "Design Systems"]),
  summary: z.string().min(20),
  headline: z.string().min(20),
  description: z.string().min(50),
  deliverables: z.array(z.string().min(5)).min(2),
  techStack: z.array(z.string().min(1)).min(2),
  architectureFocus: z.string().min(10),
  pricingGuidance: z.object({
    currency: z.enum(["GBP", "USD"]),
    range: z.string().min(5),
    engagementModel: z.string().min(5),
  }),
  outcomeStatement: z.string().min(20).optional(),
  deliveryPhases: z.array(
    z.object({
      num: z.string(),
      title: z.string(),
      description: z.string(),
      deliverables: z.array(z.string()),
    })
  ).optional(),
  techStackCategorized: z.array(
    z.object({
      category: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          rationale: z.string(),
        })
      ),
    })
  ).optional(),
  engagementDetails: z.object({
    process: z.string(),
    teamComposition: z.array(z.string()),
    timelineRange: z.string(),
    timelineConfirmation: z.string(),
    commercialModel: z.string(),
  }).optional(),
  relatedCaseStudySlugs: z.array(z.string()).optional(),
  relatedLobbySlugs: z.array(z.string()).optional(),
  aiCategories: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      architecture: z.string(),
      caseStudyRef: z.string().optional(),
    })
  ).optional(),
});

export const PerformanceMetricSchema = z.object({
  label: z.string().min(2),
  before: z.string().min(1),
  after: z.string().min(1),
  delta: z.string().optional(),
  description: z.string().min(5),
  verified: z.boolean(),
});

export const CaseStudyCreditSchema = z.object({
  role: z.string().min(2),
  name: z.string().min(2),
  affiliation: z.string().min(2),
});

export const CaseStudySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(3),
  clientSector: z.string().min(3),
  clientName: z.string().min(2),
  isInternalProduct: z.boolean().default(false),
  verified: z.boolean(),
  serviceSlug: z.string().min(1),
  serviceCategory: z.enum(["Web Platforms", "AI Systems", "Performance Engineering", "Design Systems"]),
  market: z.enum(["UK", "US", "Cross-Border"]),
  status: z.enum(["Live in Production", "In Production / In Progress", "Under Non-Disclosure Agreement", "Available for Engagement"]),
  summary: z.string().min(20),
  challenge: z.string().min(30),
  approach: z.string().min(30),
  outcome: z.string().min(30),
  performanceMetrics: z.array(PerformanceMetricSchema).optional(),
  techStack: z.array(z.string().min(1)).min(2),
  credits: z.array(CaseStudyCreditSchema).min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  nextCaseStudySlug: z.string().optional(),
  // Backward compatibility fields
  jurisdiction: z.enum(["United Kingdom", "United States", "Cross-Border"]).optional(),
  architecture: z.string().optional(),
  metrics: z.array(z.string().min(3)).optional(),
  visibleFacts: z.array(z.string().min(5)).optional(),
});

export const LobbyArticleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(10),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  authorId: z.string().min(1),
  readingTimeMinutes: z.number().int().positive(),
  excerpt: z.string().min(30),
  body: z.string().min(100),
  tags: z.array(z.string().min(1)).min(1),
});

export const TeamMemberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2),
  role: z.string().min(3),
  bio: z.string().min(30),
  locationCode: z.enum(["LON", "NYC"]),
  linkedIn: z.string().url(),
  sameAs: z.array(z.string().url()).min(1),
});

export const LocationSchema = z.object({
  code: z.enum(["LON", "NYC"]),
  city: z.string().min(2),
  country: z.string().min(2),
  jurisdiction: z.string().min(3),
  postalAddress: z.object({
    streetAddress: z.string().min(3),
    addressLocality: z.string().min(2),
    postalCode: z.string().min(3),
    addressCountry: z.string().min(2),
  }),
  telephone: z.string().min(5),
  email: z.string().email(),
  currency: z.enum(["GBP", "USD"]),
  status: z.string().min(3),
  focus: z.string().min(10),
});

export type Service = z.infer<typeof ServiceSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema>;
export type LobbyArticle = z.infer<typeof LobbyArticleSchema>;
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type Location = z.infer<typeof LocationSchema>;
