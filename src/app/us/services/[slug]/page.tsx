import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug, SERVICES } from "@/content/data/services";
import { CASE_STUDIES } from "@/content/data/case-studies";
import { LOBBY_ARTICLES } from "@/content/data/lobby";
import { constructMetadata } from "@/lib/seo/metadata";
import { ServiceJsonLd, BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { ServiceDetailView } from "@/components/services/ServiceDetailView";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug, "en-US");
  if (!service) return {};

  return constructMetadata({
    title: `${service.title} (US) | Technical Service Specification`,
    description: service.summary,
    path: `/us/services/${slug}`,
    locale: "en-US",
    hasUsAlternate: true,
  });
}

export default async function UsServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug, "en-US");

  if (!service) {
    notFound();
  }

  const relatedCaseStudies = CASE_STUDIES.filter((cs) =>
    service.relatedCaseStudySlugs?.includes(cs.slug)
  );

  const relatedLobbyArticles = LOBBY_ARTICLES.filter((article) =>
    service.relatedLobbySlugs?.includes(article.slug)
  );

  return (
    <>
      <ServiceJsonLd service={service} />
      <BreadcrumbsJsonLd
        items={[
          { name: "US Home", path: "/us" },
          { name: "Services", path: "/us/services" },
          { name: service.title, path: `/us/services/${slug}` },
        ]}
      />
      <ServiceDetailView
        service={service}
        locale="en-US"
        relatedCaseStudies={relatedCaseStudies}
        relatedLobbyArticles={relatedLobbyArticles}
      />
    </>
  );
}
