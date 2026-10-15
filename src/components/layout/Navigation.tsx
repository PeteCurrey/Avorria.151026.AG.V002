"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function Navigation() {
  const pathname = usePathname();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const isUs = pathname.startsWith("/us");
  const prefix = isUs ? "/us" : "";

  const navLinks = [
    { href: `${prefix}/services`, label: "Services", sub: "Deterministic Web & AI Architectures" },
    { href: `${prefix}/work`, label: "Work", sub: "Selected Systems & Benchmarks" },
    { href: "/lobby", label: "The Lobby", sub: "Architectural Essays & Research" },
    { href: `${prefix}/contact`, label: "Inquire", sub: "Direct Executive Transmission" },
  ];

  const alternateLocaleHref = isUs
    ? pathname.replace(/^\/us/, "") || "/"
    : `/us${pathname === "/" ? "" : pathname}`;

  // Smart hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 8) {
        // Scrolling down -> hide
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - 8) {
        // Scrolling up -> show
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Staggered reveal animation when full-screen editorial overlay opens
  useEffect(() => {
    if (!overlayRef.current) return;

    if (overlayOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();
      tl.set(overlayRef.current, { display: "flex", opacity: 0 })
        .to(overlayRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" });

      if (linksRef.current) {
        const linkItems = linksRef.current.querySelectorAll("[data-nav-item]");
        tl.fromTo(
          linkItems,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
          "-=0.15"
        );
      }
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.display = "none";
          }
        },
      });
    }

    // Keyboard accessibility: ESC closes overlay
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && overlayOpen) {
        setOverlayOpen(false);
        menuTriggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [overlayOpen]);

  // Close overlay on route navigation
  useEffect(() => {
    setOverlayOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 transform-gpu ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md hairline-b py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
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

          {/* Center Links (Desktop) */}
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

          {/* Right Action & Menu Trigger */}
          <div className="flex items-center gap-6">
            <Link
              href={alternateLocaleHref}
              className="hidden sm:inline-block px-2.5 py-1 border border-graphite-hairline hover:border-graphite text-[11px] font-mono text-graphite transition-colors"
              title={isUs ? "Switch to United Kingdom" : "Switch to United States"}
            >
              {isUs ? "UK (en-GB)" : "US (en-US)"}
            </Link>

            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setOverlayOpen(true)}
              className="flex items-center gap-2.5 text-graphite p-2 focus-visible:outline-rose group"
              aria-expanded={overlayOpen}
              aria-label="Open full-screen editorial menu"
            >
              <span className="text-xs uppercase tracking-widest font-light group-hover:text-rose transition-colors">
                Menu
              </span>
              <span className="w-4 h-[1px] bg-graphite group-hover:bg-rose group-hover:w-6 transition-all duration-200" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Menu Overlay with Staggered Reveal */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className="fixed inset-0 z-50 bg-ivory text-graphite flex-col justify-between p-8 sm:p-16 overflow-y-auto hidden"
      >
        {/* Overlay Top Bar */}
        <div className="flex items-center justify-between border-b border-graphite-hairline pb-8">
          <Link
            href={isUs ? "/us" : "/"}
            onClick={() => setOverlayOpen(false)}
            className="font-extralight text-3xl uppercase tracking-tighter-display"
          >
            Avorria
          </Link>

          <button
            type="button"
            onClick={() => setOverlayOpen(false)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-graphite hover:text-rose p-2 focus-visible:outline-rose"
            aria-label="Close navigation overlay"
          >
            <span>Close</span>
            <span className="text-base font-mono">&times;</span>
          </button>
        </div>

        {/* Staggered Navigation Items */}
        <div ref={linksRef} className="py-12 max-w-4xl space-y-8">
          <span className="text-xs font-mono uppercase tracking-widest text-rose block">
            Navigation Index
          </span>
          <div className="space-y-6">
            {navLinks.map((link, idx) => (
              <div key={link.href} data-nav-item className="border-b border-graphite-hairline pb-6">
                <Link
                  href={link.href}
                  onClick={() => setOverlayOpen(false)}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-graphite-muted">0{idx + 1}</span>
                    <span className="font-fluid-h2 font-extralight text-graphite group-hover:text-rose transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-xs font-light text-graphite-muted group-hover:text-graphite transition-colors">
                    {link.sub} &rarr;
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay Bottom Hubs & Legal */}
        <div className="border-t border-graphite-hairline pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-light text-graphite-muted">
          <div>
            <span>London [UK] &middot; New York [USA]</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={alternateLocaleHref}
              onClick={() => setOverlayOpen(false)}
              className="text-rose underline"
            >
              {isUs ? "Switch: UK Platform (/)" : "Switch: US Platform (/us)"}
            </Link>
            <span className="font-mono text-[11px]">Strict WCAG 2.2 AA</span>
          </div>
        </div>
      </div>
    </>
  );
}
