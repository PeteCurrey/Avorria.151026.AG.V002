import React from "react";
import { LOCATIONS } from "@/content/data/locations";
import { TEAM_MEMBERS } from "@/content/data/team";
import type { Service, LobbyArticle } from "@/content/schema";

const SITE_URL = "https://avorria.com";

export function OrganizationAndWebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Avorria",
        url: SITE_URL,
        logo: `${SITE_URL}/api/og?title=Avorria`,
        sameAs: ["https://github.com/avorria", "https://linkedin.com/company/avorria"],
        contactPoint: LOCATIONS.map((loc) => ({
          "@type": "ContactPoint",
          telephone: loc.telephone,
          contactType: "customer service",
          areaServed: loc.country === "United Kingdom" ? "GB" : "US",
          availableLanguage: ["en-GB", "en-US"],
          email: loc.email,
        })),
        address: LOCATIONS.map((loc) => ({
          "@type": "PostalAddress",
          streetAddress: loc.postalAddress.streetAddress,
          addressLocality: loc.postalAddress.addressLocality,
          postalCode: loc.postalAddress.postalCode,
          addressCountry: loc.postalAddress.addressCountry,
        })),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#professionalservice`,
        name: "Avorria",
        url: SITE_URL,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        priceRange: "$$$$",
        currenciesAccepted: "GBP, USD",
        paymentAccepted: "Wire Transfer, Invoice",
        areaServed: ["GB", "US"],
        knowsAbout: [
          "Next.js App Router Architecture",
          "React 19 Server Components",
          "Vite High-Performance Platforms",
          "Enterprise AI Agent Systems",
          "Core Web Vitals Optimization",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Avorria",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en-GB", "en-US"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbsJsonLd({
  items,
}: {
  items: Array<{ name: string; path: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({ service }: { service: Service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.category,
    name: service.title,
    description: service.summary,
    serviceOutput: service.outcomeStatement || service.headline,
    provider: {
      "@type": "Organization",
      name: "Avorria",
      url: SITE_URL,
    },
    areaServed: ["GB", "US"],
    offers: {
      "@type": "Offer",
      priceCurrency: service.pricingGuidance.currency,
      description: service.pricingGuidance.range,
    },
    termsOfService: `${SITE_URL}/contact`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: LobbyArticle }) {
  const author = TEAM_MEMBERS.find((m) => m.id === article.authorId);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: `${SITE_URL}/lobby/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Avorria",
      url: SITE_URL,
      logo: `${SITE_URL}/api/og?title=Avorria`,
    },
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          jobTitle: author.role,
          url: author.linkedIn,
          sameAs: author.sameAs,
        }
      : {
          "@type": "Organization",
          name: "Avorria Editorial",
        },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
