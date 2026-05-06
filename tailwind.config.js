/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C8102E",
          "red-deep": "#8E0B20",
          "red-soft": "#FAE5E9",
          charcoal: "#1A1A1A",
          ink: "#0E0E0E",
          cream: "#FAF7F2",
          gold: "#F5C518",
          "gold-soft": "#FFF6D1",
          gray: "#6B6B6B",
          "gray-line": "#E6E2DA",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Pretendard Variable",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          '"Helvetica Neue"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          "sans-serif",
        ],
        display: [
          "Pretendard",
          "Pretendard Variable",
          '"Apple SD Gothic Neo"',
          "sans-serif",
        ],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 1px 2px rgba(0,0,0,0.04), 0 16px 40px rgba(200,16,46,0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        steam: {
          "0%, 100%": { opacity: "0.4", transform: "translateY(0) scale(1)" },
          "50%": { opacity: "0.9", transform: "translateY(-8px) scale(1.05)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        steam: "steam 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
