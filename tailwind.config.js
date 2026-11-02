/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        workspace: "#0A0C12",
        "workspace-soft": "#121620",
        "workspace-muted": "#1A202E",
        ink: "#F8FAFC",
        "ink-soft": "#CBD5E1",
        "ink-muted": "#94A3B8",
        charcoal: "#0F1117",
        "charcoal-2": "#161922",
        "charcoal-3": "#1D2230",
        "electric-blue": "#0057FF",
        "electric-blue-light": "#3374FF",
        "vivid-orange": "#FF5500",
        "vivid-orange-light": "#FF7733",
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "scan-line": "scanLine 3s linear infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)", opacity: 0.5 },
          "100%": { transform: "translateY(100vh)", opacity: 0 },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      gridTemplateColumns: {
        editorial: "1fr 2fr",
        "editorial-r": "2fr 1fr",
        asymmetric: "5fr 3fr",
        "12": "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
