"use client";

import React, { useState } from "react";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Simulate reliable subscription / API trigger
    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  return (
    <div className="border border-graphite-hairline bg-ivory p-8 sm:p-12 space-y-6">
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-widest text-rose">
          Quarterly Engineering Dispatch &middot; The Lobby
        </div>
        <h3 className="text-2xl sm:text-3xl font-extralight text-graphite tracking-tight">
          System Architecture, Unfiltered.
        </h3>
        <p className="text-sm font-light text-graphite-muted max-w-xl leading-relaxed">
          Four dispatches per year. Zero marketing fluff. Production benchmarks,
          compiler trade-offs, and deterministic AI architectures written
          directly by Avorria leadership.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-4 border border-graphite-hairline bg-ivory-subtle text-xs font-mono text-graphite">
          <span className="text-rose font-medium">&check;</span> You are
          subscribed to The Lobby Dispatch. First edition lands at the quarter
          boundary.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="lead.architect@enterprise.com"
              aria-label="Business email address"
              required
              className="flex-1 px-4 py-3 bg-white border border-graphite-hairline text-xs font-mono text-graphite placeholder:text-graphite-muted/60 focus:outline-none focus:border-rose transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-graphite text-ivory text-xs font-mono uppercase tracking-wider hover:bg-rose transition-colors disabled:opacity-50 cursor-pointer"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-xs font-mono text-rose">{errorMessage}</p>
          )}
          <p className="text-[11px] font-light text-graphite-muted">
            Strict privacy. No third-party syndication. One-click unsubscribe in
            every issue.
          </p>
        </form>
      )}
    </div>
  );
}
