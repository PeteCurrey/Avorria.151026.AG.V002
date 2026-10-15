import React from "react";
import type { Metadata } from "next";
import { DesignSystemShowcase } from "./DesignSystemShowcase";

export const metadata: Metadata = {
  title: "Design System & Motion Engine (Internal Reference)",
  description: "Avorria Design Tokens, UI Components, Motion Primitives, and Contrast Verification.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
