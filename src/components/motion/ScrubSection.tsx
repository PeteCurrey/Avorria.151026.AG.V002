"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrubSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ScrubSection({ children, className = "", id }: ScrubSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // Find all elements marked for scrub in this section
      const scrubItems = containerRef.current?.querySelectorAll("[data-scrub-item]");
      if (scrubItems && scrubItems.length > 0) {
        gsap.fromTo(
          scrubItems,
          {
            opacity: 0.15,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "center 50%",
              scrub: 1,
            },
          }
        );
      }

      // Find any hairline accent elements marked for scrub expansion
      const scrubRules = containerRef.current?.querySelectorAll("[data-scrub-rule]");
      if (scrubRules && scrubRules.length > 0) {
        gsap.fromTo(
          scrubRules,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id={id} className={className}>
      {children}
    </section>
  );
}
