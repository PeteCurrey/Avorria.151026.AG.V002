"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/#standards", label: "Standards" },
  { href: "/#engagements", label: "Engagements" },
  { href: "/contact", label: "Inquire" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-md hairline-b transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Wordmark - "Avorria" ONLY */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-graphite hover:text-rose transition-colors duration-200 focus-visible:outline-rose"
          aria-label="Avorria home"
        >
          <span className="font-extralight text-2xl sm:text-3xl tracking-tighter-display uppercase">
            Avorria
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block group-hover:scale-125 transition-transform duration-200" />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-10 text-sm tracking-tight-editorial font-light text-graphite-muted"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-150 py-1 relative ${
                  isActive
                    ? "text-graphite font-light"
                    : "hover:text-graphite"
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

        {/* Global Operations Marker */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-light text-graphite-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-graphite" />
            <span>LON / NYC</span>
          </span>
          <span className="text-graphite-hairline">|</span>
          <span className="tracking-wide text-[11px] uppercase">Est. UK & US</span>
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
            {NAV_LINKS.map((link) => (
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
          <div className="pt-2 text-xs font-light text-graphite-muted flex items-center justify-between">
            <span>Avorria Operations</span>
            <span>London · New York</span>
          </div>
        </div>
      )}
    </header>
  );
}
