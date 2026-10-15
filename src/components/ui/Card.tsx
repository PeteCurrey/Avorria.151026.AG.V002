import React from "react";

export type CardVariant = "minimal" | "monolith" | "spec";

export interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  code?: string;
  eyebrow?: string;
}

export function Card({
  variant = "minimal",
  children,
  className = "",
  code,
  eyebrow,
}: CardProps) {
  if (variant === "monolith") {
    return (
      <div
        className={`theme-dark bg-graphite text-ivory border border-ivory/10 p-8 space-y-4 rounded-none transition-colors duration-200 ${className}`}
      >
        {(code || eyebrow) && (
          <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-ivory/10 pb-3">
            {code && <span className="text-rose-dark">{code}</span>}
            {eyebrow && <span className="uppercase tracking-wider">{eyebrow}</span>}
          </div>
        )}
        {children}
      </div>
    );
  }

  if (variant === "spec") {
    return (
      <div
        className={`border border-graphite-hairline p-8 bg-ivory space-y-6 relative rounded-none hover:border-graphite/40 transition-colors duration-200 ${className}`}
      >
        {(code || eyebrow) && (
          <div className="flex items-center justify-between text-xs font-mono text-graphite-muted border-b border-graphite-hairline pb-4">
            {code && <span className="text-rose font-mono">[{code}]</span>}
            {eyebrow && <span className="uppercase tracking-wider text-[11px]">{eyebrow}</span>}
          </div>
        )}
        {children}
      </div>
    );
  }

  // Default Minimal Variant
  return (
    <div
      className={`border border-graphite-hairline p-6 bg-ivory space-y-4 rounded-none hover:border-graphite/40 transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
