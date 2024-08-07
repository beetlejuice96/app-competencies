import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/auth/**/*.{js,ts,jsx,tsx,mdx}",
    // add all directories that contain  components with css classes
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    // ...
  ],
  daisyui: {
    themes: [
      {
        pocketplay: {
          primary: "#8b5cf6", // Purple for primary elements
          secondary: "#6b21a8", // Darker purple for secondary elements
          accent: "#A15FD4", // Light purple for accents
          neutral: "#1f2937", // Dark background
          "base-100": "#0F0723", // Even darker background for contrast
          info: "#3b82f6", // Blue for informational elements
          success: "#10b981", // Green for success messages
          warning: "#f59e0b", // Yellow for warnings
          error: "#ef4444", // Red for errors

          "base-content": "#ffffff", // Color de texto principal
          "neutral-content": "#ffffff", // Color de texto para elementos neutrales

          // Custom properties
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.3rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
};
export default config;
