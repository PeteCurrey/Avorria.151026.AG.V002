"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OFFICE_PRESENCES } from "@/content/standards";

export function Footer() {
  const [londonTime, setLondonTime] = useState("");
  const [nyTime, setNyTime] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const lonFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const nyFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setLondonTime(lonFormatter.format(now));
      setNyTime(nyFormatter.format(now));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus("Please provide a valid corporate email.");
      return;
    }
    setNewsletterStatus("Subscription logged. Quarterly technical dispatches only.");
    setNewsletterEmail("");
  };

  return (
    <footer className="theme-dark bg-graphite text-ivory hairline-t transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 space-y-16">
        {/* Top Monolithic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 hairline-b">
          {/* Brand & Mandate */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-ivory hover:text-rose-dark transition-colors"
              aria-label="Avorria home"
            >
              <span className="font-extralight text-3xl sm:text-4xl tracking-tighter-display uppercase">
                Avorria
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-dark inline-block" />
            </Link>
            <p className="text-sm font-light text-graphite-muted max-w-md leading-relaxed">
              Performance-first Next.js, Vite, and React web platforms and production AI systems engineered for ambitious enterprises across the UK and USA.
            </p>

            {/* Newsletter Dispatch Input */}
            <div className="pt-2 max-w-md space-y-2">
              <span className="text-xs uppercase tracking-wider text-graphite-muted block">
                The Lobby Dispatch &middot; Quarterly Systems Research
              </span>
              <form onSubmit={handleNewsletter} className="flex items-center gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="corporate.email@firm.com"
                  className="bg-transparent border border-ivory/20 px-3.5 py-2 text-xs text-ivory placeholder:text-graphite-muted focus:border-rose-dark focus:outline-none flex-1 font-mono"
                  aria-label="Subscribe to quarterly technical dispatch"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-ivory text-graphite text-xs uppercase tracking-wider font-light hover:bg-rose-dark hover:text-graphite transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
              {newsletterStatus && (
                <p className="text-[11px] text-rose-dark font-mono">{newsletterStatus}</p>
              )}
            </div>
          </div>

          {/* Operational Hubs & Live Clocks */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-graphite-muted font-light">
              Operational Hubs &amp; Local Time
            </h3>
            <div className="space-y-6">
              {/* London Hub */}
              <div className="space-y-1.5 border-l border-ivory/10 pl-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sm font-light text-ivory">London [LON]</span>
                  <span className="font-mono text-rose-dark">{londonTime || "GMT / BST"}</span>
                </div>
                <p className="text-xs font-light text-graphite-muted">
                  1 Poultry, London, EC2R 8EJ &middot; England &amp; Wales
                </p>
                <p className="text-[11px] font-mono text-graphite-muted/80">
                  Tel: +44 20 7946 0192 &middot; london@avorria.com
                </p>
              </div>

              {/* New York Hub */}
              <div className="space-y-1.5 border-l border-ivory/10 pl-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sm font-light text-ivory">New York [NYC]</span>
                  <span className="font-mono text-rose-dark">{nyTime || "EST / EDT"}</span>
                </div>
                <p className="text-xs font-light text-graphite-muted">
                  One World Trade Center, Floor 85, NY 10007 &middot; Delaware / NY
                </p>
                <p className="text-[11px] font-mono text-graphite-muted/80">
                  Tel: +1 212 555 0184 &middot; newyork@avorria.com
                </p>
              </div>
            </div>
          </div>

          {/* Direct Navigation */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-graphite-muted font-light">
              System Endpoints
            </h3>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <Link href="/services" className="text-graphite-muted hover:text-ivory transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-graphite-muted hover:text-ivory transition-colors">
                  Case Studies &amp; Mandates
                </Link>
              </li>
              <li>
                <Link href="/lobby" className="text-graphite-muted hover:text-ivory transition-colors">
                  The Lobby (Essays &amp; Standards)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-graphite-muted hover:text-ivory transition-colors">
                  Inquire on Mandate
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="text-rose-dark hover:underline font-mono text-[11px]">
                  Design System &middot; /design-system
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Legal Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-light text-graphite-muted">
          <div className="space-y-1">
            <p>&copy; {new Date().getFullYear()} Avorria. Brand name is Avorria only. All rights reserved.</p>
            <p className="text-[11px] text-graphite-muted/70">
              Enterprise digital practice operating in London, England and New York, United States.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <span>Zero Tracking Cookies</span>
            <span className="text-ivory/10">/</span>
            <span>Strict WCAG 2.2 AA</span>
            <span className="text-ivory/10">/</span>
            <span>Mobile LCP &lt; 2.0s Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
