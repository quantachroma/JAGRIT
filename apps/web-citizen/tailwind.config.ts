import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors:
        // Primary Jharkhand Emerald Green (#044728)
        primary: {
          DEFAULT: '#044728',
          50: '#eef8f2',
          100: '#d7efe1',
          200: '#b0dec3',
          300: '#81c69e',
          400: '#4fa876',
          500: '#2b8a53',
          600: '#044728',
          700: '#033b21',
          800: '#03301b',
          900: '#022414',
          950: '#01130a',
        },
        // Saffron/Gold accents (#D97706)
        accent: {
          DEFAULT: '#D97706',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Slate Gray borders (#E2E8F0)
        border: '#E2E8F0',
        background: '#FFFFFF',
        foreground: '#0F172A',
      },
    },
  },
  plugins: [],
};

export default config;

