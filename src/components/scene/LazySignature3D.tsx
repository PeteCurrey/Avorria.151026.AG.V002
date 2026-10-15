"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Dynamic3DSequence = dynamic(
  () => import("./Signature3DSequence"),
  {
    ssr: false,
    loading: () => <SequencePosterFallback />,
  }
);

function SequencePosterFallback() {
  return (
    <section className="w-full min-h-[80vh] bg-ivory border-y border-graphite-hairline flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="w-64 h-48 border border-graphite-hairline flex flex-col justify-around p-4 bg-ivory-subtle">
        <div className="w-full h-2.5 bg-graphite" />
        <div className="w-full h-2.5 bg-graphite-surface" />
        <div className="w-full h-2.5 bg-rose/40" />
        <div className="w-full h-2.5 bg-graphite" />
        <div className="w-full h-2.5 bg-graphite-surface" />
      </div>
      <span className="font-mono text-xs text-graphite-muted">
        Pre-rendered Architectural Matrix &middot; Standby
      </span>
    </section>
  );
}

export function LazySignature3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Defer loading until after initial critical paint to ensure zero impact on LCP
    const timer = setTimeout(() => {
      setMounted(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <SequencePosterFallback />;
  }

  return <Dynamic3DSequence />;
}
