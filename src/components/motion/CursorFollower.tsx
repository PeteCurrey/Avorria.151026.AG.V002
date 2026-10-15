"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check if pointer is fine (desktop mouse) and reduced motion is NOT preferred
    const hasPointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasPointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use gsap.quickTo for smooth 120fps tracking without layout thrashing
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.8, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[999] w-6 h-6 -ml-3 -mt-3 rounded-full border border-graphite/40 transition-opacity duration-300"
      aria-hidden="true"
    >
      <div className="w-1 h-1 rounded-full bg-rose absolute top-1/2 left-1/2 -ml-0.5 -mt-0.5" />
    </div>
  );
}
