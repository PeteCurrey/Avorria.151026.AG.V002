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
