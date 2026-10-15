import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import { LOBBY_ARTICLES, getCategories } from "@/content/data/lobby";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { LobbyIndexView } from "@/components/lobby/LobbyIndexView";

export const metadata = constructMetadata({
  title: "The Lobby | Architectural Essays & Research",
  description:
    "Engineering standards, system architecture essays, and deterministic AI research published by Avorria leadership.",
  path: "/lobby",
  locale: "en-GB",
  hasUsAlternate: false, // The Lobby is universal global thought leadership
});

export default function LobbyPage() {
  const categories = getCategories();

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "The Lobby", path: "/lobby" },
        ]}
      />
      <LobbyIndexView
        articles={LOBBY_ARTICLES}
        categories={categories}
      />
    </>
  );
}
