import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https:;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https://*.supabase.co https://va.vercel-scripts.com https://www.google-analytics.com https://region1.google-analytics.com;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/agency",
        destination: "/",
        permanent: true,
      },
      {
        source: "/us/lobby",
        destination: "/lobby",
        permanent: true,
      },
      {
        source: "/us/lobby/:path*",
        destination: "/lobby/:path*",
        permanent: true,
      },
      {
        source: "/services.html",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/services/nextjs-platforms",
        destination: "/services/web-engineering",
        permanent: true,
      },
      {
        source: "/services/enterprise-ai",
        destination: "/services/ai-systems",
        permanent: true,
      },
      {
        source: "/services/performance-audits",
        destination: "/services/performance-seo",
        permanent: true,
      },
      {
        source: "/us/services/nextjs-platforms",
        destination: "/us/services/web-engineering",
        permanent: true,
      },
      {
        source: "/us/services/enterprise-ai",
        destination: "/us/services/ai-systems",
        permanent: true,
      },
      {
        source: "/us/services/performance-audits",
        destination: "/us/services/performance-seo",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/case-studies/:slug",
        destination: "/work/:slug",
        permanent: true,
      },
      {
        source: "/us/case-studies",
        destination: "/us/work",
        permanent: true,
      },
      {
        source: "/us/case-studies/:slug",
        destination: "/us/work/:slug",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
