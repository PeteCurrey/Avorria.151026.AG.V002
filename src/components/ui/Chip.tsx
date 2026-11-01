import React from "react";

export interface ChipProps {
  label: string;
  variant?: "default" | "cobalt" | "cyan";
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({
  label,
  variant = "default",
  icon,
  className = "",
}: ChipProps) {
  const dotColor =
    variant === "cobalt"
      ? "bg-cobalt shadow-[0_0_8px_rgba(50,95,255,0.7)]"
      : variant === "cyan"
      ? "bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.7)]"
      : "bg-cobalt/80";

  return (
    <div
      role="status"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-md text-xs text-graphite/90 font-light tracking-wide transition-all duration-200 hover:border-cobalt/40 hover:bg-white/[0.07] ${className}`}
    >
      {icon ? (
        <span className="shrink-0 text-cobalt">{icon}</span>
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
      )}
      <span>{label}</span>
    </div>
  );
}
