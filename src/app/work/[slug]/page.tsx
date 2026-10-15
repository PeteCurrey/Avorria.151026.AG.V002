import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASE_STUDIES, getCaseStudyBySlug } from "@/content/data/case-studies";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd, CaseStudyJsonLd } from "@/components/seo/JsonLd";
import { CaseStudyDetailView } from "@/components/work/CaseStudyDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug, "en-GB");

  if (!caseStudy) {
    return constructMetadata({
      title: "Case Study Not Found",
      description: "The requested architectural case study could not be located.",
      path: `/work/${slug}`,
      locale: "en-GB",
    });
  }

  return constructMetadata({
    title: `${caseStudy.title} | Architecture Case Study`,
    description: caseStudy.summary,
    path: `/work/${caseStudy.slug}`,
    locale: "en-GB",
    hasUsAlternate: true,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug, "en-GB");

  if (!caseStudy) {
    notFound();
  }

  const currentIndex = CASE_STUDIES.findIndex((cs) => cs.slug === slug);
  const nextCaseStudy =
    CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length] || undefined;

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: caseStudy.title, path: `/work/${caseStudy.slug}` },
        ]}
      />
      <CaseStudyJsonLd caseStudy={caseStudy} locale="en-GB" />
      <CaseStudyDetailView
        caseStudy={caseStudy}
        nextCaseStudy={nextCaseStudy}
        locale="en-GB"
      />
    </>
  );
}
