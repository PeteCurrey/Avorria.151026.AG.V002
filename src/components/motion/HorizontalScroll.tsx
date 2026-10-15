"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  heading?: React.ReactNode;
}

export function HorizontalScroll({
  children,
  className = "",
  heading,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion || !containerRef.current || !trackRef.current) {
      return;
    }

    const container = containerRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 120}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  if (isReducedMotion) {
    // Accessible, standard overflow-x scroll for reduced motion users
    return (
      <section className={`py-16 ${className}`}>
        {heading && <div className="max-w-7xl mx-auto px-6 mb-8">{heading}</div>}
        <div className="overflow-x-auto px-6 flex gap-8 pb-4">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {heading && (
        <div className="absolute top-8 left-8 z-20 pointer-events-none">
          {heading}
        </div>
      )}
      <div
        ref={trackRef}
        className="flex items-center h-screen will-change-transform pl-8 pr-24 space-x-12"
      >
        {children}
      </div>
    </section>
  );
}
