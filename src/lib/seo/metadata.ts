import type { Metadata } from "next";

export const SITE_URL = "https://avorria.com";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  path: string; // e.g. "/" or "/services" or "/us/services"
  locale?: "en-GB" | "en-US";
  hasUsAlternate?: boolean; // if true, sets up reciprocal hreflangs between /... and /us/...
  ogSubtitle?: string;
}

export function constructMetadata({
  title,
  description,
  path,
  locale = "en-GB",
  hasUsAlternate = true,
  ogSubtitle,
}: GenerateMetadataOptions): Metadata {
  const isUs = path.startsWith("/us");
  const basePath = isUs ? path.replace(/^\/us/, "") || "/" : path;

  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const gbUrl = `${SITE_URL}${basePath === "/" ? "" : basePath}`;
  const usUrl = `${SITE_URL}/us${basePath === "/" ? "" : basePath}`;

  const cleanTitle = title.replace(/\s*\|\s*Avorria\s*$/i, "").trim();
  const formattedTitle =
    path === "/" || path === "/us"
      ? cleanTitle.startsWith("Avorria")
        ? cleanTitle
        : `Avorria | ${cleanTitle}`
      : cleanTitle;

  const alternates: Metadata["alternates"] = {
    canonical: canonicalUrl,
  };

  if (hasUsAlternate) {
    alternates.languages = {
      "en-GB": gbUrl,
      "en-US": usUrl,
      "x-default": gbUrl,
    };
  }

  const ogImageUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(formattedTitle)}&subtitle=${encodeURIComponent(ogSubtitle || description.slice(0, 110))}`;

  return {
    title: formattedTitle,
    description,
    alternates,
    openGraph: {
      title: formattedTitle,
      description,
      url: canonicalUrl,
      siteName: "Avorria",
      locale: locale.replace("-", "_"),
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${formattedTitle} - Avorria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
