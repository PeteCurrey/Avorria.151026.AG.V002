import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 sm:px-8 max-w-3xl mx-auto py-24 text-center">
      <div className="space-y-6">
        <span className="text-xs uppercase tracking-widest text-rose font-light block">
          404 &middot; Coordinate Undefined
        </span>
        <h1 className="text-4xl sm:text-6xl font-extralight text-graphite tracking-tighter-display">
          Resource Not Located
        </h1>
        <p className="text-sm font-light text-graphite-muted max-w-md mx-auto leading-relaxed">
          The requested path does not exist within the Avorria system architecture.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="px-8 py-3.5 bg-graphite text-ivory text-xs uppercase tracking-widest font-light hover:bg-rose transition-colors inline-block"
          >
            Return to Overview &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
