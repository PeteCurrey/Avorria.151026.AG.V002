"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text-link";
  href?: string;
  magnetic?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  href,
  magnetic = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!magnetic || !el) return;

    const hasFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      // Subtle magnetic pull (max 10px)
      xTo(relX * 0.25);
      yTo(relY * 0.25);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [magnetic]);

  // Style Variants: CMC Spectre Electric Cobalt Pill & Frosted Glass
  const baseClasses =
    variant === "primary"
      ? "inline-flex items-center justify-center px-7 py-3 rounded-full bg-cobalt text-white text-xs uppercase tracking-wider font-light shadow-[0_0_20px_rgba(50,95,255,0.3)] hover:bg-[#436DFF] hover:shadow-[0_0_28px_rgba(50,95,255,0.5)] transition-all duration-200 focus-visible:outline-cobalt"
      : variant === "secondary"
      ? "inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md text-white text-xs uppercase tracking-wider font-light hover:bg-white/[0.12] hover:border-white/35 transition-all duration-200 focus-visible:outline-cobalt"
      : "underline-sweep text-xs uppercase tracking-wider font-light text-graphite hover:text-cobalt transition-colors py-1";

  const combinedClasses = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={combinedClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
