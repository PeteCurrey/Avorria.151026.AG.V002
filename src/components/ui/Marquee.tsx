"use client";

import React, { useEffect, useState } from "react";

export interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // duration in seconds
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 35,
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReducedMotion);
  }, []);

  if (isReducedMotion) {
    // Safe static fallback for users preferring reduced motion
    return (
      <div className={`overflow-x-auto py-6 border-y border-graphite-hairline ${className}`}>
        <div className="flex flex-wrap items-center justify-around gap-8 text-xs font-mono text-graphite-muted">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden border-y border-graphite-hairline py-4 select-none ${className}`}
      role="region"
      aria-label="Continuous ticker"
    >
      <div
        className={`flex w-max items-center gap-12 will-change-transform animate-marquee ${
          pauseOnHover ? "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]" : ""
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center gap-12">{children}</div>
        <div className="flex items-center gap-12" aria-hidden="true">{children}</div>
        <div className="flex items-center gap-12" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
