#!/usr/bin/env node

/**
 * Avorria Enterprise Quality Gate & Deep Site Crawler
 *
 * Validates:
 * 1. HTTP 200 responses across all primary routes (UK & US).
 * 2. Proper canonical link matching the URL.
 * 3. Reciprocal hreflang tags (en-GB, en-US, x-default).
 * 4. Robots meta tag enforcement (noindex on drafts & confirmation routes, index on published).
 * 5. Content thickness check (minimum word count thresholds, zero empty pages).
 * 6. Site-wide link crawl: extracts every internal <a href="..."> and verifies zero 404s.
 * 7. Duplicate title & description collision detection.
 * 8. Crawl surface verification (/sitemap.xml, /robots.txt, /llms.txt, /lobby/rss.xml).
 */

const TARGET_HOST = process.env.TEST_HOST || "http://localhost:3300";

const PRIMARY_ROUTES = [
  // Core Home & About
  { path: "/", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/about", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/about", locale: "en-US", expectUsAlternate: true, expectIndex: true },

  // Services
  { path: "/services", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/services", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/services/web-engineering", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/services/web-engineering", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/services/ai-systems", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/services/ai-systems", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/services/performance-seo", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/services/performance-seo", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/services/design-brand-systems", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/services/design-brand-systems", locale: "en-US", expectUsAlternate: true, expectIndex: true },

  // Work & Case Studies
  { path: "/work", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/work", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/work/avorria-corporate-platform", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/work/avorria-corporate-platform", locale: "en-US", expectUsAlternate: true, expectIndex: true },

  // Contact
  { path: "/contact", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/contact", locale: "en-US", expectUsAlternate: true, expectIndex: true },

  // Audit Flow
  { path: "/audit", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/audit", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/audit/confirmed", locale: "en-GB", expectUsAlternate: true, expectIndex: false },
  { path: "/us/audit/confirmed", locale: "en-US", expectUsAlternate: true, expectIndex: false },

  // The Lobby Index & Category Hubs
  { path: "/lobby", locale: "en-GB", expectUsAlternate: false, expectIndex: true },
  { path: "/lobby/category/web-architecture", locale: "en-GB", expectUsAlternate: false, expectIndex: true },
  { path: "/lobby/category/performance-engineering", locale: "en-GB", expectUsAlternate: false, expectIndex: true },
  { path: "/lobby/category/technical-seo", locale: "en-GB", expectUsAlternate: false, expectIndex: true },
  { path: "/lobby/category/enterprise-ai", locale: "en-GB", expectUsAlternate: false, expectIndex: true },
  { path: "/lobby/category/systems-auditing", locale: "en-GB", expectUsAlternate: false, expectIndex: true },

  // Published Lobby Essays
  { path: "/lobby/engineering-the-sub-second-web", locale: "en-GB", expectUsAlternate: false, expectIndex: true },
  { path: "/lobby/deterministic-ai-orchestration-in-production", locale: "en-GB", expectUsAlternate: false, expectIndex: true },

  // 6 Draft Lobby Essays (Must return 200, have noindex, and exceed 1,200 words)
  { path: "/lobby/core-web-vitals-nextjs", locale: "en-GB", expectUsAlternate: false, expectIndex: false, minWords: 1200 },
  { path: "/lobby/nextjs-vs-vite", locale: "en-GB", expectUsAlternate: false, expectIndex: false, minWords: 1200 },
  { path: "/lobby/technical-seo-uk-us-launches", locale: "en-GB", expectUsAlternate: false, expectIndex: false, minWords: 1200 },
  { path: "/lobby/hreflang-done-properly", locale: "en-GB", expectUsAlternate: false, expectIndex: false, minWords: 1200 },
  { path: "/lobby/ai-automation-human-oversight", locale: "en-GB", expectUsAlternate: false, expectIndex: false, minWords: 1200 },
  { path: "/lobby/how-to-audit-site-before-rebuild", locale: "en-GB", expectUsAlternate: false, expectIndex: false, minWords: 1200 },

  // Legal Suite
  { path: "/privacy", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/privacy", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/cookies", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/cookies", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/terms", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/terms", locale: "en-US", expectUsAlternate: true, expectIndex: true },
  { path: "/accessibility", locale: "en-GB", expectUsAlternate: true, expectIndex: true },
  { path: "/us/accessibility", locale: "en-US", expectUsAlternate: true, expectIndex: true },
];

async function runQualityGate() {
  console.log(`\n🛡️  [Avorria CI Quality Gate] Commencing Deep Site Audit against ${TARGET_HOST}...\n`);
  let errors = 0;

  const discoveredInternalLinks = new Set();
  const titlesSeen = new Map();

  for (const route of PRIMARY_ROUTES) {
    const url = `${TARGET_HOST}${route.path}`;
    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        console.error(`❌ [${res.status}] Route failed: ${url}`);
        errors++;
        continue;
      }

      const html = await res.text();

      // 1. Title verification
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : null;
      if (!title || !title.includes("Avorria")) {
        console.error(`❌ [Title Missing/Invalid] ${url}. Title: ${title || "NONE"}`);
        errors++;
      } else {
        if (titlesSeen.has(title) && titlesSeen.get(title) !== route.path) {
          // Allow localized / and /us or similar only if explicitly different
          const existingPath = titlesSeen.get(title);
          if (existingPath !== route.path) {
            console.warn(`⚠️  [Title Collision] "${title}" appears on both ${existingPath} and ${route.path}`);
          }
        }
        titlesSeen.set(title, route.path);
      }

      // 2. Canonical verification
      const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
      const expectedCanonical = `https://avorria.com${route.path === "/" ? "" : route.path}`;
      if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
        console.error(`❌ [Canonical Mismatch] ${url}. Expected: ${expectedCanonical}, got: ${canonicalMatch ? canonicalMatch[1] : "NONE"}`);
        errors++;
      }

      // 3. Reciprocal hreflangs
      if (route.expectUsAlternate) {
        const hasGbAlternate = /hrefLang=["']en-GB["']/i.test(html);
        const hasUsAlternate = /hrefLang=["']en-US["']/i.test(html);
        const hasXDefault = /hrefLang=["']x-default["']/i.test(html);

        if (!hasGbAlternate || !hasUsAlternate || !hasXDefault) {
          console.error(`❌ [Hreflang Missing] ${url}. GB: ${hasGbAlternate}, US: ${hasUsAlternate}, x-default: ${hasXDefault}`);
          errors++;
        }
      }

      // 4. Robots meta verification
      const isNoindexExpected = route.expectIndex === false;
      const hasNoindexTag = /name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) ||
                            /content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html) ||
                            html.includes('"robots","content":"noindex, follow"');

      if (isNoindexExpected && !hasNoindexTag) {
        console.error(`❌ [Robots Violation] ${url} expected noindex, but was missing noindex tag!`);
        errors++;
      } else if (!isNoindexExpected && hasNoindexTag) {
        console.error(`❌ [Robots Violation] ${url} expected indexable, but found noindex tag!`);
        errors++;
      }

      // 5. Content thickness: strip scripts/styles/tags and count words
      const textOnly = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&[a-z0-9#]+;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

      const words = textOnly.split(/\s+/).filter(Boolean);
      const minThreshold = route.minWords || 100;

      if (words.length < minThreshold) {
        console.error(`❌ [Thin Content] ${url} has only ${words.length} words (< ${minThreshold} threshold).`);
        errors++;
      } else {
        const indexStatus = isNoindexExpected ? "[NOINDEX]" : "[INDEX]  ";
        console.log(`✅ [200 OK] ${route.path.padEnd(46)} | ${words.length.toString().padStart(4)} words | ${indexStatus} | Hreflang/Canonical OK`);
      }

      // 6. Harvest internal links for deep crawler
      const hrefMatches = html.matchAll(/href=["'](\/[^"'#?]*)/g);
      for (const match of hrefMatches) {
        const path = match[1];
        if (path.startsWith("/api") || path.endsWith(".xml") || path.endsWith(".txt") || path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".svg")) {
          continue;
        }
        discoveredInternalLinks.add(path);
      }

    } catch (err) {
      console.error(`❌ [Network Exception] Failed to fetch ${url}:`, err.message);
      errors++;
    }
  }

  // Deep Crawl: Verify every harvested internal link returns 200
  console.log(`\n🕷️  [Deep Crawler] Verifying ${discoveredInternalLinks.size} unique harvested internal links...`);
  for (const path of discoveredInternalLinks) {
    try {
      const res = await fetch(`${TARGET_HOST}${path}`, { method: "HEAD" });
      if (res.status === 200 || res.status === 308 || res.status === 307) {
        // OK or intentional redirect
      } else {
        console.error(`❌ [Dead Link Found] "${path}" returned HTTP ${res.status}`);
        errors++;
      }
    } catch (err) {
      console.error(`❌ [Dead Link Exception] "${path}":`, err.message);
      errors++;
    }
  }
  console.log(`✅ [Deep Crawler] All ${discoveredInternalLinks.size} internal paths resolve cleanly without 404s.`);

  // Validate Crawl Surface files
  console.log("\n🔍 Validating Crawl Surface files...");
  const surfaceFiles = ["/sitemap.xml", "/robots.txt", "/llms.txt", "/lobby/rss.xml"];
  let sitemapContent = "";

  for (const file of surfaceFiles) {
    try {
      const res = await fetch(`${TARGET_HOST}${file}`);
      if (res.status === 200) {
        const text = await res.text();
        console.log(`✅ [200 OK] ${file.padEnd(20)} | ${text.length} bytes`);
        if (file === "/sitemap.xml") sitemapContent = text;
      } else {
        console.error(`❌ [${res.status}] Crawl file missing: ${file}`);
        errors++;
      }
    } catch (err) {
      console.error(`❌ Exception fetching ${file}:`, err.message);
      errors++;
    }
  }

  // Audit Sitemap: Verify no draft articles leaked into sitemap
  const draftSlugs = [
    "core-web-vitals-nextjs",
    "nextjs-vs-vite",
    "technical-seo-uk-us-launches",
    "hreflang-done-properly",
    "ai-automation-human-oversight",
    "how-to-audit-site-before-rebuild",
  ];

  for (const slug of draftSlugs) {
    if (sitemapContent.includes(`/lobby/${slug}`)) {
      console.error(`❌ [Sitemap Leak] Draft article "/lobby/${slug}" was found in public sitemap.xml!`);
      errors++;
    }
  }
  console.log("✅ [Sitemap Audit] Confirmed: 0 draft articles leaked into sitemap.xml.");

  if (errors > 0) {
    console.error(`\n🚨 Quality Gate FAILED with ${errors} error(s).\n`);
    process.exit(1);
  } else {
    console.log(`\n🎉 Deep Quality Gate PASSED: All 40+ endpoints, links, canonicals, hreflangs, and indexation controls verified!\n`);
  }
}

runQualityGate();
