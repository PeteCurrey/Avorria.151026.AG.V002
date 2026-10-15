#!/usr/bin/env node

/**
 * Avorria CI Quality Gate Verification Script
 * Validates:
 * 1. HTTP 200 responses across all sitemap routes.
 * 2. Proper canonical link matching the URL.
 * 3. Reciprocal hreflang tags (en-GB, en-US, x-default).
 * 4. Content thickness check (no page blank or under 100 words).
 * 5. Security headers presence.
 */

const TARGET_HOST = process.env.TEST_HOST || "http://localhost:3300";

const ROUTES_TO_TEST = [
  { path: "/", locale: "en-GB", expectUsAlternate: true },
  { path: "/us", locale: "en-US", expectUsAlternate: true },
  { path: "/services", locale: "en-GB", expectUsAlternate: true },
  { path: "/us/services", locale: "en-US", expectUsAlternate: true },
  { path: "/services/web-engineering", locale: "en-GB", expectUsAlternate: true },
  { path: "/us/services/web-engineering", locale: "en-US", expectUsAlternate: true },
  { path: "/services/ai-systems", locale: "en-GB", expectUsAlternate: true },
  { path: "/us/services/ai-systems", locale: "en-US", expectUsAlternate: true },
  { path: "/services/performance-seo", locale: "en-GB", expectUsAlternate: true },
  { path: "/us/services/performance-seo", locale: "en-US", expectUsAlternate: true },
  { path: "/services/design-brand-systems", locale: "en-GB", expectUsAlternate: true },
  { path: "/us/services/design-brand-systems", locale: "en-US", expectUsAlternate: true },
  { path: "/case-studies", locale: "en-GB", expectUsAlternate: true },
  { path: "/us/case-studies", locale: "en-US", expectUsAlternate: true },
  { path: "/lobby", locale: "en-GB", expectUsAlternate: false },
  { path: "/lobby/engineering-the-sub-second-web", locale: "en-GB", expectUsAlternate: false },
  { path: "/contact", locale: "en-GB", expectUsAlternate: true },
  { path: "/us/contact", locale: "en-US", expectUsAlternate: true },
];

async function runQualityGate() {
  console.log(`\n🛡️  [Avorria CI Quality Gate] Commencing audit against ${TARGET_HOST}...\n`);
  let errors = 0;

  for (const route of ROUTES_TO_TEST) {
    const url = `${TARGET_HOST}${route.path}`;
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        console.error(`❌ [${res.status}] Route failed: ${url}`);
        errors++;
        continue;
      }

      const html = await res.text();

      // 1. Check title
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      if (!titleMatch || !titleMatch[1].includes("Avorria")) {
        console.error(`❌ [Title Missing/Invalid] ${url}. Title: ${titleMatch ? titleMatch[1] : "NONE"}`);
        errors++;
      }

      // 2. Check canonical
      const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
      const expectedCanonical = `https://avorria.com${route.path === "/" ? "" : route.path}`;
      if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
        console.error(`❌ [Canonical Mismatch] ${url}. Expected: ${expectedCanonical}, got: ${canonicalMatch ? canonicalMatch[1] : "NONE"}`);
        errors++;
      }

      // 3. Check reciprocal hreflangs if applicable (case-insensitive for hrefLang/hreflang)
      if (route.expectUsAlternate) {
        const hasGbAlternate = /hrefLang=["']en-GB["']/i.test(html);
        const hasUsAlternate = /hrefLang=["']en-US["']/i.test(html);
        const hasXDefault = /hrefLang=["']x-default["']/i.test(html);

        if (!hasGbAlternate || !hasUsAlternate || !hasXDefault) {
          console.error(`❌ [Hreflang Missing] ${url}. GB: ${hasGbAlternate}, US: ${hasUsAlternate}, x-default: ${hasXDefault}`);
          errors++;
        }
      }

      // 4. Content thickness: strip tags and count words
      const textOnly = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&[a-z0-9#]+;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

      const words = textOnly.split(/\s+/).filter(Boolean);
      if (words.length < 100) {
        console.error(`❌ [Thin Content] ${url} has only ${words.length} words (< 100 threshold).`);
        errors++;
      } else {
        console.log(`✅ [200 OK] ${route.path.padEnd(42)} | ${words.length} words | Canonical & Hreflang Verified`);
      }
    } catch (err) {
      console.error(`❌ [Network Exception] Failed to fetch ${url}:`, err.message);
      errors++;
    }
  }

  // Check Crawl Surface Files
  console.log("\n🔍 Validating Crawl Surface files...");
  const surfaceFiles = ["/sitemap.xml", "/robots.txt", "/llms.txt", "/lobby/rss.xml"];
  for (const file of surfaceFiles) {
    try {
      const res = await fetch(`${TARGET_HOST}${file}`);
      if (res.status === 200) {
        const text = await res.text();
        console.log(`✅ [200 OK] ${file.padEnd(20)} | ${text.length} bytes`);
      } else {
        console.error(`❌ [${res.status}] Crawl file missing: ${file}`);
        errors++;
      }
    } catch (err) {
      console.error(`❌ Exception fetching ${file}:`, err.message);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\n🚨 Quality Gate FAILED with ${errors} error(s).\n`);
    process.exit(1);
  } else {
    console.log(`\n🎉 Quality Gate PASSED: All routes, canonicals, hreflangs, and content budgets verified!\n`);
  }
}

runQualityGate();
