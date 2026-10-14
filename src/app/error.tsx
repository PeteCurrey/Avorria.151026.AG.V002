"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical application error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 sm:px-8 max-w-3xl mx-auto py-24 text-center">
      <div className="space-y-6">
        <span className="text-xs uppercase tracking-widest text-rose font-light block">
          500 &middot; System Exception
        </span>
        <h1 className="text-4xl sm:text-6xl font-extralight text-graphite tracking-tighter-display">
          Internal Architecture Fault
        </h1>
        <p className="text-sm font-light text-graphite-muted max-w-md mx-auto leading-relaxed">
          The requested system operation encountered an unexpected execution state. Telemetry has logged the incident for review.
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-graphite-muted">
            Digest Reference: {error.digest}
          </p>
        )}
        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-8 py-3.5 bg-graphite text-ivory text-xs uppercase tracking-widest font-light hover:bg-rose transition-colors"
          >
            Reattempt Operation
          </button>
        </div>
      </div>
    </div>
  );
}
