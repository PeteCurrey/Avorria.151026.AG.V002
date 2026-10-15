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
  const caseStudy = getCaseStudyBySlug(slug, "en-US");

  if (!caseStudy) {
    return constructMetadata({
      title: "Case Study Not Found",
      description: "The requested architectural case study could not be located.",
      path: `/us/work/${slug}`,
      locale: "en-US",
    });
  }

  return constructMetadata({
    title: `${caseStudy.title} (US) | Architecture Case Study`,
    description: caseStudy.summary,
    path: `/us/work/${caseStudy.slug}`,
    locale: "en-US",
    hasUsAlternate: true,
  });
}

export default async function UsCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug, "en-US");

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
          { name: "Home", path: "/us" },
          { name: "Work", path: "/us/work" },
          { name: caseStudy.title, path: `/us/work/${caseStudy.slug}` },
        ]}
      />
      <CaseStudyJsonLd caseStudy={caseStudy} locale="en-US" />
      <CaseStudyDetailView
        caseStudy={caseStudy}
        nextCaseStudy={nextCaseStudy}
        locale="en-US"
      />
    </>
  );
}
