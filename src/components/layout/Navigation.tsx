"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isUs = pathname.startsWith("/us");
  const prefix = isUs ? "/us" : "";

  const navLinks = [
    { href: `${prefix}/services`, label: "Services" },
    { href: `${prefix}/case-studies`, label: "Case Studies" },
    { href: "/lobby", label: "The Lobby" },
    { href: `${prefix}/contact`, label: "Inquire" },
  ];

  // Derive reciprocal path for locale toggle
  const alternateLocaleHref = isUs
    ? pathname.replace(/^\/us/, "") || "/"
    : `/us${pathname === "/" ? "" : pathname}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-md hairline-b transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Wordmark - "Avorria" ONLY */}
        <Link
          href={isUs ? "/us" : "/"}
          className="group flex items-center gap-3 text-graphite hover:text-rose transition-colors duration-200 focus-visible:outline-rose"
          aria-label={isUs ? "Avorria US Home" : "Avorria Home"}
        >
          <span className="font-extralight text-2xl sm:text-3xl tracking-tighter-display uppercase">
            Avorria
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block group-hover:scale-125 transition-transform duration-200" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-8 text-xs tracking-tight-editorial font-light text-graphite-muted"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-150 py-1 relative ${
                  isActive ? "text-graphite font-light" : "hover:text-graphite"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-rose" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Locale & Operations Selector */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-light text-graphite-muted">
          <Link
            href={alternateLocaleHref}
            className="px-2.5 py-1 border border-graphite-hairline hover:border-graphite text-[11px] font-mono text-graphite transition-colors"
            title={isUs ? "Switch to United Kingdom (en-GB)" : "Switch to United States (en-US)"}
          >
            {isUs ? "Switch: UK (en-GB)" : "Switch: US (en-US)"}
          </Link>
          <span className="text-graphite-hairline">|</span>
          <span className="tracking-wide text-[11px] uppercase">
            {isUs ? "New York Hub" : "London Hub"}
          </span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-graphite p-2 focus-visible:outline-rose"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className="text-xs uppercase tracking-widest font-light">
            {mobileMenuOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-ivory hairline-b px-6 py-8 space-y-6"
          role="region"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-light text-graphite hover:text-rose transition-colors py-1 hairline-b border-graphite/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-graphite-hairline flex items-center justify-between text-xs">
            <Link
              href={alternateLocaleHref}
              onClick={() => setMobileMenuOpen(false)}
              className="text-rose underline"
            >
              {isUs ? "Switch to UK site (/)" : "Switch to US site (/us)"}
            </Link>
            <span className="font-mono text-graphite-muted">
              {isUs ? "NYC Hub" : "LON Hub"}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
