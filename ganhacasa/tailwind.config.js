import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/product/**/*.{js,ts,jsx,tsx,mdx}',
    './components/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#FF395C", // Your new primary color
            "primary-foreground": "#FFFFFF", // Added foreground color
          },
        },
        dark: {
          colors: {
            primary: "#FF395C", // Your new primary color for dark mode too
            "primary-foreground": "#FFFFFF", // Added foreground color
          },
        },
      },
    }),
  ],
}

module.exports = config;