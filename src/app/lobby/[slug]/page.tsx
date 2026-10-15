import React from "react";
import { notFound } from "next/navigation";
import { LOBBY_ARTICLES, getArticleBySlug } from "@/content/data/lobby";
import { TEAM_MEMBERS } from "@/content/data/team";
import { constructMetadata } from "@/lib/seo/metadata";
import { ArticleJsonLd, BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { ArticleDetailView } from "@/components/lobby/ArticleDetailView";

interface LobbyPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LOBBY_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: LobbyPostPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return constructMetadata({
    title: `${article.title} | The Lobby`,
    description: article.excerpt,
    path: `/lobby/${slug}`,
    locale: "en-GB",
    hasUsAlternate: false,
    noindex: article.status === "draft",
  });
}

export default async function LobbyArticlePage({ params }: LobbyPostPageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const author = TEAM_MEMBERS.find((m) => m.id === article.authorId);

  // Compute related articles (by relatedSlugs or category)
  const relatedArticles = LOBBY_ARTICLES.filter((a) => {
    if (a.slug === article.slug) return false;
    if (article.relatedSlugs?.includes(a.slug)) return true;
    return a.category === article.category;
  }).slice(0, 3);

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "The Lobby", path: "/lobby" },
          { name: article.title, path: `/lobby/${slug}` },
        ]}
      />
      <ArticleDetailView
        article={article}
        author={author}
        relatedArticles={relatedArticles}
      />
    </>
  );
}
