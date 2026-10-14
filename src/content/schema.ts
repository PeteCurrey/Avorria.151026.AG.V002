import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  code: z.string().min(1),
  title: z.string().min(3),
  category: z.enum(["Web Platforms", "AI Systems", "Performance Engineering"]),
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
});

export const CaseStudySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(3),
  clientSector: z.string().min(3),
  jurisdiction: z.enum(["United Kingdom", "United States", "Cross-Border"]),
  status: z.enum(["Available for Engagement", "Under Non-Disclosure Agreement"]),
  challenge: z.string().min(30),
  architecture: z.string().min(30),
  metrics: z.array(z.string().min(3)).min(1),
  visibleFacts: z.array(z.string().min(5)).min(2),
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
