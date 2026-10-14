import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LenisScrollProvider } from "@/components/motion/LenisScrollProvider";
import { OrganizationAndWebsiteJsonLd } from "@/components/seo/JsonLd";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-work-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avorria.com"),
  title: {
    default: "Avorria | Performance-First Web Platforms & AI Systems",
    template: "%s | Avorria",
  },
  description:
    "Avorria architects performance-first Next.js, Vite, and React web platforms and production AI systems for enterprise clients across the UK and USA.",
  keywords: [
    "Avorria",
    "Next.js agency",
    "React 19 agency",
    "Vite development",
    "Enterprise AI systems",
    "High-performance web architecture",
    "Core Web Vitals agency",
    "London web engineering",
    "New York AI architecture",
  ],
  authors: [{ name: "Avorria" }],
  creator: "Avorria",
  publisher: "Avorria",
  alternates: {
    canonical: "https://avorria.com",
    languages: {
      "en-GB": "https://avorria.com",
      "en-US": "https://avorria.com/us",
      "x-default": "https://avorria.com",
    },
  },
  openGraph: {
    title: "Avorria | Performance-First Web Platforms & AI Systems",
    description:
      "Avorria delivers performance-first Next.js, Vite, and React websites and AI systems for clients in the UK and USA.",
    url: "https://avorria.com",
    siteName: "Avorria",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://avorria.com/api/og?title=Avorria&subtitle=Performance-first%20Web%20Platforms%20%26%20AI%20Systems",
        width: 1200,
        height: 630,
        alt: "Avorria Corporate Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avorria | Performance-First Web Platforms & AI Systems",
    description:
      "Avorria delivers performance-first Next.js, Vite, and React websites and AI systems for clients in the UK and USA.",
    images: ["https://avorria.com/api/og?title=Avorria&subtitle=Performance-first%20Web%20Platforms%20%26%20AI%20Systems"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${workSans.variable}`}>
      <head>
        <OrganizationAndWebsiteJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory text-graphite font-light antialiased selection:bg-rose selection:text-ivory">
        {/* Skip to Content for WCAG 2.2 AA Keyboard Accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <LenisScrollProvider>
          <Navigation />
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <ConsentBanner />
        </LenisScrollProvider>
      </body>
    </html>
  );
}
