import type { Config } from "tailwindcss";
import { tokens } from './src/styles/design-tokens';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: tokens.colors.background,
        text: tokens.colors.text,
        border: tokens.colors.border,
      },
      fontFamily: {
        sans: [tokens.typography.fonts.body],
        display: [tokens.typography.fonts.display],
      },
    },
  },
  plugins: [],
};

export default config;
