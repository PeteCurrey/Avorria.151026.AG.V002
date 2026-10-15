"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface ParallaxImageProps {
  src?: string;
  alt?: string;
  className?: string;
  speed?: number; // 0.1 to 0.5
  children?: React.ReactNode;
}

export function ParallaxImage({
  src,
  alt = "Avorria Architecture",
  className = "h-[450px]",
  speed = 0.25,
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current || !innerRef.current) {
      return;
    }

    const container = containerRef.current;
    const inner = innerRef.current;

    const yMovement = speed * 100; // e.g. 25%

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        {
          yPercent: -yMovement / 2,
        },
        {
          yPercent: yMovement / 2,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ isolation: "isolate" }}
    >
      <div
        ref={innerRef}
        className="absolute inset-0 w-full h-[125%] -top-[12.5%] will-change-transform flex items-center justify-center bg-graphite-surface"
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover select-none pointer-events-none"
            loading="lazy"
          />
        ) : (
          children || (
            <div className="w-full h-full border border-graphite-hairline flex flex-col items-center justify-center text-ivory/60 space-y-2 p-8 text-center bg-graphite">
              <span className="font-mono text-xs uppercase tracking-widest text-rose">
                Parallax Datum &middot; Overscan 1.25x
              </span>
              <p className="text-sm font-light max-w-sm text-graphite-muted">
                Mathematical overscan prevents edge-clipping during 60fps ScrollTrigger scrubbing.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
