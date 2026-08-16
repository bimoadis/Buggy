import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:          "var(--color-primary)",
        "primary-dark":   "var(--color-primary-dark)",
        "primary-light":  "var(--color-primary-light)",
        secondary:        "var(--color-secondary)",
        "secondary-dark": "var(--color-secondary-dark)",
        "secondary-light":"var(--color-secondary-light)",
        "hero-bg":        "var(--color-hero-bg)",
        surface:          "var(--color-surface)",
        "surface-alt":    "var(--color-surface-alt)",
        border:           "var(--color-border)",
        text:             "var(--color-text)",
        "text-muted":     "var(--color-text-muted)",
        "text-subtle":    "var(--color-text-subtle)",
        success:          "var(--color-success)",
        danger:           "var(--color-danger)",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
