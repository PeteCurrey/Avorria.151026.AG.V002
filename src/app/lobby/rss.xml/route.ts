import { NextResponse } from "next/server";
import { LOBBY_ARTICLES } from "@/content/data/lobby";
import { TEAM_MEMBERS } from "@/content/data/team";

export const dynamic = "force-static";

export async function GET() {
  const SITE_URL = "https://avorria.com";

  const rssItems = LOBBY_ARTICLES.map((article) => {
    const author = TEAM_MEMBERS.find((m) => m.id === article.authorId);
    const pubDate = new Date(article.publishedAt).toUTCString();

    return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/lobby/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/lobby/${article.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${article.excerpt}]]></description>
      <author>${author?.name || "Avorria Editorial"}</author>
    </item>`;
  }).join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Avorria | The Lobby</title>
    <link>${SITE_URL}/lobby</link>
    <description>Architectural essays, engineering standards, and production AI research from Avorria leadership.</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/lobby/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
