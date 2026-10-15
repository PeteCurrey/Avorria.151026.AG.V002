import type { MetadataRoute } from "next";
import { SERVICES } from "@/content/data/services";
import { CASE_STUDIES } from "@/content/data/case-studies";
import { LOBBY_ARTICLES } from "@/content/data/lobby";

const BASE_URL = "https://avorria.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Helper to add reciprocal routes
  const addLocalizedPage = (path: string, lastmod: string = "2026-04-12", priority: number = 0.8) => {
    const gbUrl = `${BASE_URL}${path === "/" ? "" : path}`;
    const usUrl = `${BASE_URL}/us${path === "/" ? "" : path}`;

    // UK page
    routes.push({
      url: gbUrl,
      lastModified: new Date(lastmod),
      changeFrequency: "weekly",
      priority,
      alternates: {
        languages: {
          "en-GB": gbUrl,
          "en-US": usUrl,
          "x-default": gbUrl,
        },
      },
    });

    // US page
    routes.push({
      url: usUrl,
      lastModified: new Date(lastmod),
      changeFrequency: "weekly",
      priority,
      alternates: {
        languages: {
          "en-GB": gbUrl,
          "en-US": usUrl,
          "x-default": gbUrl,
        },
      },
    });
  };

  // Home
  addLocalizedPage("/", "2026-04-12", 1.0);

  // Services index
  addLocalizedPage("/services", "2026-04-12", 0.9);

  // Individual services
  SERVICES.forEach((service) => {
    addLocalizedPage(`/services/${service.slug}`, "2026-04-10", 0.85);
  });

  // Work & Case studies (only verified architectures are included in sitemap)
  const verifiedCaseStudies = CASE_STUDIES.filter((cs) => cs.verified);
  if (verifiedCaseStudies.length > 0) {
    addLocalizedPage("/work", "2026-04-14", 0.85);
    verifiedCaseStudies.forEach((cs) => {
      addLocalizedPage(`/work/${cs.slug}`, cs.updatedAt, 0.8);
    });
  }

  // Contact
  addLocalizedPage("/contact", "2026-04-12", 0.8);

  // Lobby (Editorial thought leadership) - global
  routes.push({
    url: `${BASE_URL}/lobby`,
    lastModified: new Date("2026-04-12"),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  // Individual Lobby articles
  LOBBY_ARTICLES.forEach((article) => {
    routes.push({
      url: `${BASE_URL}/lobby/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return routes;
}
