"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ScrubSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  pin?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onUpdate?: (progress: number) => void;
}

export function ScrubSection({
  children,
  className = "",
  id,
  pin = false,
  start = "top 80%",
  end = "bottom 20%",
  scrub = 1,
  onUpdate,
}: ScrubSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const element = containerRef.current;

    const ctx = gsap.context(() => {
      // Create primary ScrollTrigger
      ScrollTrigger.create({
        trigger: element,
        start,
        end,
        pin,
        scrub,
        onUpdate: (self) => {
          if (onUpdate) {
            onUpdate(self.progress);
          }
        },
      });

      // Find any scrub items in container
      const scrubItems = element.querySelectorAll("[data-scrub-item]");
      if (scrubItems && scrubItems.length > 0) {
        gsap.fromTo(
          scrubItems,
          { opacity: 0.15, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "center 50%",
              scrub,
            },
          }
        );
      }

      // Hairline expansion rules
      const scrubRules = element.querySelectorAll("[data-scrub-rule]");
      if (scrubRules && scrubRules.length > 0) {
        gsap.fromTo(
          scrubRules,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "top 45%",
              scrub,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [pin, start, end, scrub, onUpdate]);

  return (
    <section ref={containerRef} id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}
