import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd, OrganizationAndWebsiteJsonLd } from "@/components/seo/JsonLd";
import { AboutView } from "@/components/about/AboutView";

export const metadata = constructMetadata({
  title: "About Avorria | Architectural Discipline & Leadership",
  description:
    "Founded by Technical Director Pete Currey. We engineer deterministic Next.js web platforms and production AI systems for ambitious UK and US enterprises.",
  path: "/about",
  locale: "en-GB",
  hasUsAlternate: true,
});

export default function AboutPage() {
  return (
    <>
      <OrganizationAndWebsiteJsonLd />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutView market="UK" />
    </>
  );
}
