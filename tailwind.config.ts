import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#fdfbd4",
        "barn-red": "#7C0A02",
        maroon: "#800000",
        "chili-red": "#C21807",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      cursor: {
        default: "url(/retro-cursor.svg), default",
        pointer: "url(/retro-pointer.svg), pointer",
      },
      dropShadow: {
        white: "0 0 8px rgba(255, 255, 255, 0.5)",
        glow: "0 0 10px rgba(255, 0, 0, 0.3)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate"), "prettier-plugin-tailwindcss"],
};
export default config;
