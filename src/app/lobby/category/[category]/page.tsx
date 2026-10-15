import React from "react";
import { notFound } from "next/navigation";
import {
  LOBBY_ARTICLES,
  CATEGORY_REGISTRY,
  getCategories,
} from "@/content/data/lobby";
import { constructMetadata } from "@/lib/seo/metadata";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { LobbyIndexView } from "@/components/lobby/LobbyIndexView";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.values(CATEGORY_REGISTRY).map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const entry = Object.entries(CATEGORY_REGISTRY).find(
    ([_, val]) => val.slug === categorySlug
  );

  if (!entry) return {};

  const [categoryName, data] = entry;

  return constructMetadata({
    title: `${categoryName} Research & Architectural Essays | The Lobby`,
    description: data.intro.slice(0, 155),
    path: `/lobby/category/${categorySlug}`,
    locale: "en-GB",
    hasUsAlternate: false,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const entry = Object.entries(CATEGORY_REGISTRY).find(
    ([_, val]) => val.slug === categorySlug
  );

  if (!entry) {
    notFound();
  }

  const [categoryName, data] = entry;
  const allCategories = getCategories();
  const categoryArticles = LOBBY_ARTICLES.filter(
    (a) => a.category === categoryName
  );

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "The Lobby", path: "/lobby" },
          { name: categoryName, path: `/lobby/category/${categorySlug}` },
        ]}
      />
      <LobbyIndexView
        articles={categoryArticles}
        categories={allCategories}
        initialCategory={categoryName}
        categoryIntro={data.intro}
      />
    </>
  );
}
