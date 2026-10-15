import React from "react";

export interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  heading,
  lead,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`space-y-4 max-w-3xl ${
        isCenter ? "mx-auto text-center items-center" : ""
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-2.5 text-xs uppercase tracking-widest text-rose font-light ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose inline-block" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="font-fluid-h2 text-graphite tracking-tight-display">
        {heading}
      </h2>

      {lead && (
        <p className="font-fluid-body text-graphite-muted leading-relaxed">
          {lead}
        </p>
      )}
    </div>
  );
}
