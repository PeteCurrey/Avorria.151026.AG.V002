"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ReadingProgressBar({
  targetRef,
}: {
  targetRef?: React.RefObject<HTMLElement | null>;
}) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const el = barRef.current;
    if (!el) return;

    // Initial scaleX is 0
    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });

    const triggerElement = targetRef?.current || document.body;

    const trigger = ScrollTrigger.create({
      trigger: triggerElement,
      start: "top top",
      end: "bottom bottom",
      scrub: prefersReducedMotion ? false : 0.1,
      onUpdate: (self) => {
        gsap.to(el, {
          scaleX: self.progress,
          duration: prefersReducedMotion ? 0 : 0.05,
          ease: "none",
          overwrite: "auto",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [targetRef]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-rose origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
