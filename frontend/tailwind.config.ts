import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This maps the CSS variable we created in layout.tsx to Tailwind's 'sans' utility
        sans: ['var(--font-josefin)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
