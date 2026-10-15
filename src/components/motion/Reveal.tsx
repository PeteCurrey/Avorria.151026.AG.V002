"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface RevealProps {
  children: React.ReactNode;
  type?: "lines" | "block";
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export function useReveal() {
  const triggerReveal = (element: HTMLElement | null, options: { delay?: number; stagger?: number } = {}) => {
    if (!element) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, delay: options.delay || 0, ease: "power3.out" }
    );
  };

  return { triggerReveal };
}

export function Reveal({
  children,
  type = "lines",
  stagger = 0.08,
  duration = 0.85,
  delay = 0,
  className = "",
  as: Component = "div",
}: RevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const element = containerRef.current;
    let ctx: gsap.Context;

    if (type === "lines") {
      // Split text into line-masked spans
      const text = element.innerText || "";
      const words = text.split(" ");
      element.innerHTML = "";

      const wordSpans: HTMLSpanElement[] = [];
      words.forEach((word, idx) => {
        const spanWrapper = document.createElement("span");
        spanWrapper.className = "inline-block overflow-hidden align-top";
        spanWrapper.style.paddingBottom = "0.05em";

        const innerSpan = document.createElement("span");
        innerSpan.className = "inline-block transform-gpu";
        innerSpan.textContent = word + (idx < words.length - 1 ? "\u00A0" : "");

        spanWrapper.appendChild(innerSpan);
        element.appendChild(spanWrapper);
        wordSpans.push(innerSpan);
      });

      ctx = gsap.context(() => {
        gsap.fromTo(
          wordSpans,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration,
            stagger,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      }, element);
    } else {
      // Block reveal
      ctx = gsap.context(() => {
        const target = element.children.length > 0 ? Array.from(element.children) : element;
        gsap.fromTo(
          target,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger: element.children.length > 0 ? stagger : 0,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );
      }, element);
    }

    return () => {
      ctx?.revert();
    };
  }, [type, stagger, duration, delay]);

  if (isReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}
