"use client";

import React, { useState, useEffect } from "react";

export function HubClock({ timeZone, fallback }: { timeZone: string; fallback: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <span className="font-mono text-xs text-rose font-light">{time || fallback}</span>;
}
