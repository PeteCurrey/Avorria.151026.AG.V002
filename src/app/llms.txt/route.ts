import { NextResponse } from "next/server";
import { SERVICES } from "@/content/data/services";
import { LOCATIONS } from "@/content/data/locations";
import { LOBBY_ARTICLES } from "@/content/data/lobby";

export const dynamic = "force-static";

export async function GET() {
  const content = `# Avorria

> Performance-first Next.js, Vite, and React web platforms and production AI systems for enterprise clients in the UK and USA.

## Corporate Summary
Avorria operates as an elite technical partner delivering deterministic software architectures. We engineer bespoke enterprise web platforms and production-hardened multi-agent AI systems, governed under English and American corporate law.

## Architectural Principles
- **Sub-Second Performance**: Throttled cellular Largest Contentful Paint (LCP) guaranteed < 2.0s, CLS < 0.02, and INP < 150ms.
- **Server Components & Edge Rendering**: Maximum computation performed on the server and CDN edge, preserving client main-thread availability.
- **Deterministic AI Orchestration**: Multi-agent state machines, formal schema enforcement (Zod/TypeScript), and vector similarity caching.
- **Restrained Visual Language**: Exclusively ivory (#FAF8F5), graphite (#141517), and rose (#A33A4B). Zero AI-slop, glowing orbs, or generic SaaS tropes.

## Core Services
${SERVICES.map((s) => `- **${s.title}** (${s.code}): ${s.summary}\n  URL: https://avorria.com/services/${s.slug}`).join("\n")}

## Operational Hubs
${LOCATIONS.map((l) => `- **${l.city} (${l.code})**: ${l.status}. Address: ${l.postalAddress.streetAddress}, ${l.postalAddress.addressLocality}, ${l.postalAddress.postalCode}, ${l.country}. Direct: ${l.email}`).join("\n")}

## Key Articles (The Lobby)
${LOBBY_ARTICLES.map((a) => `- **${a.title}**: ${a.excerpt}\n  URL: https://avorria.com/lobby/${a.slug}`).join("\n")}

## Site Index & Feeds
- Homepage (UK): https://avorria.com
- Homepage (US): https://avorria.com/us
- Services (UK): https://avorria.com/services
- Services (US): https://avorria.com/us/services
- Case Studies: https://avorria.com/case-studies
- The Lobby: https://avorria.com/lobby
- RSS Feed: https://avorria.com/lobby/rss.xml
- Contact & Inquiries: https://avorria.com/contact
- XML Sitemap: https://avorria.com/sitemap.xml
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
