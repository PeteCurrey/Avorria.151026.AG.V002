"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition() {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid running on initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !curtainRef.current) {
      return;
    }

    const curtain = curtainRef.current;

    const tl = gsap.timeline();
    tl.set(curtain, { transformOrigin: "bottom center", scaleY: 0, opacity: 1 })
      .to(curtain, {
        scaleY: 1,
        duration: 0.3,
        ease: "power3.inOut",
      })
      .set(curtain, { transformOrigin: "top center" })
      .to(curtain, {
        scaleY: 0,
        duration: 0.35,
        ease: "power3.inOut",
        delay: 0.05,
      });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="pointer-events-none fixed inset-0 z-[9999] bg-graphite transform-gpu will-change-transform scale-y-0"
      aria-hidden="true"
    />
  );
}
