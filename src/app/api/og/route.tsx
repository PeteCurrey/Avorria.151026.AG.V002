import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Performance-First Web Platforms & AI Systems";
    const subtitle = searchParams.get("subtitle") || "Avorria delivers Next.js, Vite, and production AI architectures across the UK & USA.";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#FAF8F5",
            padding: "60px 80px",
            fontFamily: "system-ui, -apple-system, sans-serif",
            border: "16px solid #141517",
          }}
        >
          {/* Top Brand Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(20, 21, 23, 0.15)",
              paddingBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  color: "#141517",
                  textTransform: "uppercase",
                }}
              >
                Avorria
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#A33A4B",
                  marginLeft: 10,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 14,
                letterSpacing: "0.15em",
                color: "#595D66",
                textTransform: "uppercase",
              }}
            >
              London · New York
            </span>
          </div>

          {/* Central Title Statement */}
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px" }}>
            <h1
              style={{
                fontSize: 52,
                fontWeight: 300,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "#141517",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 22,
                fontWeight: 300,
                lineHeight: 1.45,
                color: "#595D66",
                marginTop: 20,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Bottom Architectural Metadata Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(20, 21, 23, 0.15)",
              paddingTop: "24px",
              fontSize: 14,
              color: "#595D66",
            }}
          >
            <span>Next.js App Router · React 19 · Production AI Systems</span>
            <span style={{ color: "#A33A4B", fontFamily: "monospace" }}>avorria.com</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (err) {
    console.error("Failed to generate dynamic OG image:", err);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
