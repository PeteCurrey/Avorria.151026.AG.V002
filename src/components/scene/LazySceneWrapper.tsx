"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ComponentErrorBoundary } from "@/components/ui/ComponentErrorBoundary";

const DynamicArchitecturalScene = dynamic(
  () => import("./ArchitecturalMonolithScene"),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

function SceneFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      aria-hidden="true"
    >
      {/* Restrained Architectural Wireframe Monolith Fallback */}
      <div className="w-44 h-80 border border-graphite-hairline relative flex items-center justify-center opacity-40">
        <div className="absolute inset-x-0 top-1/2 border-t border-graphite-hairline" />
        <div className="absolute inset-y-0 left-1/2 border-l border-graphite-hairline" />
        <div className="w-16 h-16 border border-rose/30 rotate-45" />
      </div>
    </div>
  );
}

export function LazySceneWrapper() {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Defer 3D initialization until after critical paint has completed
    const timer = window.setTimeout(() => {
      setShouldRender3D(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender3D) {
    return <SceneFallback />;
  }

  return (
    <ComponentErrorBoundary fallback={<SceneFallback />}>
      <DynamicArchitecturalScene />
    </ComponentErrorBoundary>
  );
}
