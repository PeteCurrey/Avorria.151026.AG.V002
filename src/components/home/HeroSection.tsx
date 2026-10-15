"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [londonTime, setLondonTime] = useState("");
  const [nyTime, setNyTime] = useState("");

  useEffect(() => {
    // Live ticking clocks for London & NYC
    const updateTimes = () => {
      const now = new Date();
      const lon = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const ny = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      setLondonTime(lon);
      setNyTime(ny);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Masked line entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (headlineRef.current) {
      const lines = headlineRef.current.querySelectorAll(".hero-line-inner");
      tl.fromTo(
        lines,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.12, delay: 0.1 }
      );
    }

    if (copyRef.current) {
      tl.fromTo(
        copyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );
    }
  }, []);

  return (
    <section
      className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between px-6 sm:px-8 lg:px-12 pt-8 pb-10 bg-ivory text-graphite border-b border-graphite-hairline"
      aria-label="Avorria Hero"
    >
      {/* Top Editorial Eyebrow */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-graphite-muted pt-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
          <span className="uppercase tracking-widest text-graphite font-light">
            Architectural Digital Practice &middot; UK &amp; USA
          </span>
        </div>
        <span className="hidden sm:inline-block font-mono text-[11px] text-graphite-muted">
          Contractual SLA: Mobile LCP &lt; 2.0s
        </span>
      </div>

      {/* Main Core Display (LCP Element) */}
      <div className="w-full max-w-7xl mx-auto my-auto py-12 lg:py-16 space-y-8">
        <h1
          ref={headlineRef}
          className="font-fluid-display font-extralight text-graphite tracking-tighter-display max-w-5xl"
        >
          <span className="block overflow-hidden pb-1">
            <span className="hero-line-inner inline-block">
              Performance-first websites
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="hero-line-inner inline-block">
              and AI systems for
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="hero-line-inner inline-block text-graphite">
              ambitious UK and US businesses<span className="text-rose font-light">.</span>
            </span>
          </span>
        </h1>

        <p
          ref={copyRef}
          className="text-base sm:text-lg lg:text-xl font-light text-graphite-muted max-w-3xl leading-relaxed"
        >
          Avorria delivers deterministic web architecture, sub-2.0s Core Web Vitals, and production-hardened AI pipelines for high-growth enterprises in London and New York.
        </p>

        {/* Two CTAs */}
        <div ref={ctaRef} className="pt-4 flex flex-wrap items-center gap-5">
          <Button href="/contact" variant="primary" magnetic>
            Start a project &rarr;
          </Button>
          <Button href="#selected-work" variant="secondary">
            View our work
          </Button>
        </div>
      </div>

      {/* Subtle Bottom Local Times & Transatlantic Status */}
      <div className="w-full max-w-7xl mx-auto pt-6 border-t border-graphite-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-graphite-muted">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-graphite font-light">London [LON]</span>
            <span className="text-rose">{londonTime || "GMT / BST"}</span>
          </div>
          <span className="text-graphite-hairline">/</span>
          <div className="flex items-center gap-2">
            <span className="text-graphite font-light">New York [NYC]</span>
            <span className="text-rose">{nyTime || "EST / EDT"}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span>Continuous Transatlantic Synchronisation</span>
        </div>
      </div>
    </section>
  );
}
