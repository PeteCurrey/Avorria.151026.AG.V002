import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd, OrganizationAndWebsiteJsonLd } from "@/components/seo/JsonLd";
import { AboutView } from "@/components/about/AboutView";

export const metadata = constructMetadata({
  title: "About Avorria | Architectural Discipline & Leadership (US)",
  description:
    "Led by Technical Director Pete Currey. We engineer deterministic Next.js web platforms and production AI systems for ambitious North American enterprises.",
  path: "/us/about",
  locale: "en-US",
  hasUsAlternate: true,
});

export default function UsAboutPage() {
  return (
    <>
      <OrganizationAndWebsiteJsonLd />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/us" },
          { name: "About", path: "/us/about" },
        ]}
      />
      <AboutView market="US" />
    </>
  );
}
