import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/auth/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/platform/**/*.{js,ts,jsx,tsx,mdx}",
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
          primary: "#100C26", // Dark navy blue
          secondary: "#342A67", // Deep purple
          accent: "#675AB3", // Medium purple
          neutral: "#7E73C9", // Light purple
          "base-100": "#EDEFF0", // Very light gray (almost white)
          info: "#3b82f6", // Keeping the original blue for info
          success: "#10b981", // Keeping the original green for success
          warning: "#f59e0b", // Keeping the original yellow for warning
          error: "#ef4444", // Keeping the original red for error
          "base-content": "#100C26", // Using the darkest color for main text
          "neutral-content": "#EDEFF0", // Using the lightest color for neutral text

          // Custom properties (keeping them as they were)
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
