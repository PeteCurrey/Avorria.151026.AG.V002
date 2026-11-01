"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="w-full py-28 sm:py-36 bg-midnight text-white border-b border-white/10 relative overflow-hidden"
      aria-label="Initiate Mandate"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cobalt/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12 relative z-10">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cobalt shadow-[0_0_8px_rgba(50,95,255,0.8)] inline-block" />
            <span className="text-xs font-mono uppercase tracking-widest text-white">
              08 / Mandate Transmission
            </span>
          </div>

          <h2 className="font-fluid-display font-extralight text-white tracking-tighter-display">
            Initiate an engineering mandate<span className="text-cobalt font-light">.</span>
          </h2>

          <p className="font-fluid-body text-graphite-muted max-w-2xl leading-relaxed">
            Direct partner consultation for enterprise technology executives in the UK and USA. We assess codebases, establish Core Web Vitals guarantees, and architect deterministic AI pipelines under mutual non-disclosure.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-6">
          <Button href="/contact" variant="primary" magnetic>
            Start a project &rarr;
          </Button>
          <Button href="/services" variant="secondary">
            Review engineering services
          </Button>
        </div>

        <div className="pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-mono text-graphite-muted">
          <div className="p-4 rounded-xl border border-white/5 bg-midnight-card/40 backdrop-blur-sm">
            <span className="text-white uppercase tracking-wider block mb-1 font-medium">London Office</span>
            <span>+44 20 7946 0192</span>
            <span className="block text-cobalt">london@avorria.com</span>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-midnight-card/40 backdrop-blur-sm">
            <span className="text-white uppercase tracking-wider block mb-1 font-medium">New York Office</span>
            <span>+1 212 555 0184</span>
            <span className="block text-cobalt">newyork@avorria.com</span>
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-midnight-card/40 backdrop-blur-sm">
            <span className="text-white uppercase tracking-wider block mb-1 font-medium">Commercial Terms</span>
            <span className="text-white">Fixed-milestone SOW</span>
            <span className="block text-cobalt">Mutual NDA Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
}
