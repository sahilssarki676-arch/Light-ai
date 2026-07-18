/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Design tokens for "Light" — deep slate-void with a warm filament accent
        void: {
          DEFAULT: "#0B0E14",
          soft: "#11151F",
          raised: "#161B27",
        },
        light: {
          DEFAULT: "#FFB86B", // signature warm glow — Light's namesake accent
          soft: "#FFD9A8",
          dim: "#8A5A2B",
        },
        cyan: {
          DEFAULT: "#5EEAD4",
          soft: "#99F6E4",
        },
        ink: {
          DEFAULT: "#F5F3EE",
          muted: "#94A3B8",
          faint: "#5B6577",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(255, 184, 107, 0.35)",
        "glow-cyan": "0 0 40px -10px rgba(94, 234, 212, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        filament: {
          "0%, 100%": { opacity: "0.6", transform: "scaleY(0.6)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.8" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        filament: "filament 1.2s ease-in-out infinite",
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
