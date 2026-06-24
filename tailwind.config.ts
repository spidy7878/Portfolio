import type { Config } from "tailwindcss";

/**
 * Design tokens for the portfolio.
 *
 * The palette is intentionally near-neutral (graphite / charcoal / off-white)
 * with a single cool blue→violet accent ramp. Colors are exposed as CSS
 * variables (see index.css) so the theme can flip between dark and light
 * without re-rendering React — Tailwind just reads `rgb(var(--token))`.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Surface + text tokens (CSS-variable driven, theme-aware)
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        // Accent ramp (blue → violet)
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          violet: "rgb(var(--accent-violet) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Satoshi", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid display sizes
        "display-sm": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.5rem, 7vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3rem, 10vw, 7rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        glass: "0 1px 0 0 rgb(255 255 255 / 0.06) inset, 0 8px 40px -12px rgb(0 0 0 / 0.5)",
        soft: "0 24px 60px -28px rgb(0 0 0 / 0.55)",
        glow: "0 0 80px -20px rgb(var(--accent) / 0.55)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgb(var(--accent) / 0.14), transparent 70%)",
        "accent-gradient":
          "linear-gradient(135deg, rgb(var(--accent)) 0%, rgb(var(--accent-violet)) 100%)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        "fade-in": "fade-in 0.6s var(--ease-out-expo) both",
      },
    },
  },
  plugins: [],
};

export default config;
