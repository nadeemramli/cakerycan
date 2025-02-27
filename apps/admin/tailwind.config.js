/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: 'white',
        'background-dark': '#1a1a1a',
      },
      textColor: {
        foreground: '#0a0a0a',
        'foreground-dark': '#ffffff',
      },
      borderColor: {
        border: '#e5e5e5',
        'border-dark': '#2a2a2a',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 