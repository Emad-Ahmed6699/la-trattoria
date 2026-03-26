import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "var(--on-tertiary-container)",
        "secondary-container": "var(--secondary-container)",
        "error": "var(--error)",
        "on-error": "var(--on-error)",
        "surface": "var(--surface)",
        "on-background": "var(--on-background)",
        "on-tertiary": "var(--on-tertiary)",
        "on-primary": "var(--on-primary)",
        "inverse-primary": "var(--inverse-primary)",
        "on-error-container": "var(--on-error-container)",
        "primary": "var(--primary)",
        "on-secondary": "var(--on-secondary)",
        "on-secondary-container": "var(--on-secondary-container)",
        "primary-container": "var(--primary-container)",
        "surface-variant": "var(--surface-variant)",
        "background": "var(--background)",
        "surface-tint": "var(--surface-tint)",
        "surface-container-low": "var(--surface-container-low)",
        "on-surface": "var(--on-surface)",
        "surface-container": "var(--surface-container)",
        "surface-dim": "var(--surface-dim)",
        "on-primary-container": "var(--on-primary-container)",
        "on-surface-variant": "var(--on-surface-variant)",
        "error-container": "var(--error-container)",
        "outline": "var(--outline)",
        "tertiary": "var(--tertiary)",
        "surface-container-lowest": "var(--surface-container-lowest)",
        "outline-variant": "var(--outline-variant)",
        "inverse-on-surface": "var(--inverse-on-surface)",
        "surface-container-highest": "var(--surface-container-highest)",
        "surface-container-high": "var(--surface-container-high)",
        "inverse-surface": "var(--inverse-surface)",
      },
      fontFamily: {
        headline: ["var(--font-noto-serif)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        label: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
        "2xl": "1rem", // Added for some local styles
      },
    },
  },
  plugins: [],
};
export default config;
