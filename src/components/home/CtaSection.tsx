"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section
      id="cta"
      className="w-full py-28 sm:py-36 bg-ivory text-graphite border-b border-graphite-hairline"
      aria-label="Initiate Mandate"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-rose inline-block" />
            <span className="text-xs font-mono uppercase tracking-widest text-graphite">
              08 / Mandate Transmission
            </span>
          </div>

          <h2 className="font-fluid-display font-extralight text-graphite tracking-tighter-display">
            Initiate an engineering mandate<span className="text-rose font-light">.</span>
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

        <div className="pt-12 border-t border-graphite-hairline grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs font-mono text-graphite-muted">
          <div>
            <span className="text-graphite uppercase tracking-wider block mb-1">London Office</span>
            <span>+44 20 7946 0192</span>
            <span className="block text-rose">london@avorria.com</span>
          </div>

          <div>
            <span className="text-graphite uppercase tracking-wider block mb-1">New York Office</span>
            <span>+1 212 555 0184</span>
            <span className="block text-rose">newyork@avorria.com</span>
          </div>

          <div>
            <span className="text-graphite uppercase tracking-wider block mb-1">Commercial Terms</span>
            <span>Fixed-milestone SOW</span>
            <span className="block text-graphite">Mutual NDA Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
}
