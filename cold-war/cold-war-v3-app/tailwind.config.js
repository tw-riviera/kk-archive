/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Cold War custom colors
        void: "#050508",
        midnight: "#0a0f1e",
        "steel-blue": "#141e33",
        "grid-blue": "#1a2744",
        "classified-red": "#dc2626",
        "alert-amber": "#f59e0b",
        "ice-white": "#e2e8f0",
        "ghost-grey": "#94a3b8",
        "steel-cyan": "#38bdf8",
        "surveillance-green": "#10b981",
        "traitor-red": "#ef4444",
        "ally-cyan": "#06b6d4",
        "neutral-grey": "#6b7280",
        "target-amber": "#f59e0b",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
        terminal: ['"JetBrains Mono"', 'monospace'],
        display: ['"Noto Sans SC"', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "pulse-warning": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "typing-cursor": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
        "grid-flicker": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.5" },
        },
        "scroll-prompt": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "line-draw": {
          from: { height: "0" },
          to: { height: "40px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        "pulse-warning": "pulse-warning 2s ease-in-out infinite",
        "typing-cursor": "typing-cursor 530ms infinite",
        "grid-flicker": "grid-flicker 0.1s ease-in-out",
        "scroll-prompt": "scroll-prompt 1.5s ease-in-out infinite",
        "line-draw": "line-draw 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
