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

  // Style Variants
  const baseClasses =
    variant === "primary"
      ? "inline-flex items-center justify-center px-8 py-3.5 bg-graphite text-ivory text-xs uppercase tracking-widest font-light hover:bg-rose transition-colors duration-200 focus-visible:outline-rose rounded-none"
      : variant === "secondary"
      ? "inline-flex items-center justify-center px-8 py-3.5 border border-graphite-hairline text-graphite text-xs uppercase tracking-widest font-light hover:border-graphite transition-colors duration-200 focus-visible:outline-rose rounded-none bg-transparent"
      : "underline-sweep text-xs uppercase tracking-wider font-light text-graphite hover:text-rose transition-colors py-1";

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
