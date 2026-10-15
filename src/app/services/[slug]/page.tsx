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
  const service = getServiceBySlug(slug, "en-GB");
  if (!service) return {};

  return constructMetadata({
    title: `${service.title} | Technical Service Specification`,
    description: service.summary,
    path: `/services/${slug}`,
    locale: "en-GB",
    hasUsAlternate: true,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug, "en-GB");

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
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]}
      />
      <ServiceDetailView
        service={service}
        locale="en-GB"
        relatedCaseStudies={relatedCaseStudies}
        relatedLobbyArticles={relatedLobbyArticles}
      />
    </>
  );
}
