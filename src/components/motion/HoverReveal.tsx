"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export type HoverRevealVariant = "cursor-mask" | "underline-sweep" | "card-lift" | "row-hover";

export interface HoverRevealProps {
  variant: HoverRevealVariant;
  children: React.ReactNode;
  revealContent?: React.ReactNode;
  previewImage?: string;
  previewText?: string;
  className?: string;
}

export function HoverReveal({
  variant,
  children,
  revealContent,
  previewImage,
  previewText,
  className = "",
}: HoverRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    setIsTouchDevice(isTouch);
  }, []);

  // Handle cursor tracking for cursor-mask and row-hover on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current || !floatingRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (variant === "cursor-mask") {
      gsap.to(floatingRef.current, {
        x,
        y,
        duration: 0.25,
        ease: "power2.out",
      });
    } else if (variant === "row-hover") {
      gsap.to(floatingRef.current, {
        x: x + 24,
        y: y - 40,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // 1. Variant: Underline Sweep
  if (variant === "underline-sweep") {
    return (
      <span className={`underline-sweep cursor-pointer ${className}`}>
        {children}
      </span>
    );
  }

  // 2. Variant: Card Lift with Content Reveal
  if (variant === "card-lift") {
    return (
      <div
        className={`border border-graphite-hairline p-6 bg-ivory transition-all duration-300 ${
          isTouchDevice
            ? ""
            : "hover:-translate-y-1.5 hover:border-graphite hover:shadow-lg"
        } ${className}`}
      >
        <div>{children}</div>
        {/* Reveal content: permanently visible on touch, reveals on hover on desktop */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isTouchDevice
              ? "mt-4 pt-3 border-t border-graphite-hairline opacity-100"
              : "opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-32 group-hover:mt-4 group-hover:pt-3 group-hover:border-t group-hover:border-graphite-hairline"
          }`}
        >
          {revealContent}
        </div>
      </div>
    );
  }

  // 3. Variant: Cursor Mask Reveal
  if (variant === "cursor-mask") {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative overflow-hidden border border-graphite-hairline select-none ${className}`}
      >
        {/* Base Layer */}
        <div className="p-8">{children}</div>

        {/* Revealed Layer on Touch: Displayed Inline */}
        {isTouchDevice ? (
          <div className="p-6 bg-graphite text-ivory border-t border-graphite-hairline">
            <span className="text-xs uppercase tracking-widest text-rose font-mono block mb-1">
              Expanded Specification
            </span>
            {revealContent || <p className="text-xs">Tactile inline alternative for touch interfaces.</p>}
          </div>
        ) : (
          /* Masked Follower Layer on Pointer: Fine */
          <div
            ref={floatingRef}
            className={`pointer-events-none absolute w-48 h-48 rounded-full bg-graphite text-ivory flex items-center justify-center p-4 text-center text-xs shadow-2xl transition-opacity duration-200 -top-24 -left-24 ${
              isHovered ? "opacity-95 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-mono text-rose block">Datum Reveal</span>
              <p className="text-[11px] leading-tight font-light">{previewText || "Verified Architecture"}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. Variant: Row Hover (Table / List row with preview)
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-between border-b border-graphite-hairline py-4 px-2 group hover:bg-ivory-subtle transition-colors ${className}`}
    >
      <div className="flex-1">{children}</div>

      {/* Touch: Render preview datum inline */}
      {isTouchDevice ? (
        <span className="text-xs font-mono text-rose uppercase tracking-wider">
          {previewText || "[Active Specification]"}
        </span>
      ) : (
        /* Pointer: Floating Thumbnail/Datum beside cursor */
        <div
          ref={floatingRef}
          className={`pointer-events-none fixed z-50 px-3 py-1.5 bg-graphite text-ivory text-xs font-mono border border-graphite-hairline shadow-xl transition-opacity duration-150 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-rose mr-1.5">&bull;</span>
          {previewText || "System Specification"}
        </div>
      )}
    </div>
  );
}
