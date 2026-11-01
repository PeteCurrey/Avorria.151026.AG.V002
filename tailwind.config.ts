import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "var(--color-ivory)",
          subtle: "var(--color-ivory-subtle)",
          muted: "var(--color-ivory-muted)",
        },
        graphite: {
          DEFAULT: "var(--color-graphite)",
          surface: "var(--color-graphite-surface)",
          muted: "var(--color-graphite-muted)",
          hairline: "var(--color-graphite-hairline)",
        },
        rose: {
          DEFAULT: "var(--color-rose)",
          subtle: "var(--color-rose-subtle)",
          dark: "var(--color-rose-dark)",
        },
        midnight: {
          DEFAULT: "#0A0B11",
          deep: "#05060A",
          surface: "#11131C",
          card: "#161925",
          subtle: "#1D2130",
          border: "rgba(255, 255, 255, 0.09)",
        },
        cobalt: {
          DEFAULT: "#325FFF",
          light: "#4D7CFF",
          cyan: "#00E5FF",
          glow: "rgba(50, 95, 255, 0.35)",
          subtle: "rgba(50, 95, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        extralight: "200",
        light: "300",
      },
      letterSpacing: {
        "tighter-display": "-0.045em",
        "tight-display": "-0.03em",
        "tight-editorial": "-0.015em",
      },
      borderWidth: {
        hairline: "0.5px",
      },
    },
  },
  plugins: [],
};

export default config;
