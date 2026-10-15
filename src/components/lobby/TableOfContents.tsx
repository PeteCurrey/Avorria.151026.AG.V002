"use client";

import React, { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-28 space-y-4 p-6 bg-ivory border border-graphite-hairline"
    >
      <div className="text-[11px] font-mono uppercase tracking-widest text-graphite-muted pb-3 border-b border-graphite-hairline">
        Contents &middot; Outline
      </div>
      <ul className="space-y-2 text-xs font-light">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    setActiveId(item.id);
                    window.history.pushState(null, "", `#${item.id}`);
                  }
                }}
                className={`block py-1 transition-colors duration-200 ${
                  isActive
                    ? "text-rose font-normal translate-x-1"
                    : "text-graphite-muted hover:text-graphite"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
