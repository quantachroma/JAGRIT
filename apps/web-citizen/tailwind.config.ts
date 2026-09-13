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
        // Base Canvas & Surfaces
        canvas: {
          DEFAULT: '#FFFFFF',
          neutral: '#F8FAFC',
        },
        // Primary Civic Trust Blue (#1D4ED8 / #2563EB / #1E40AF)
        primary: {
          DEFAULT: '#1D4ED8',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
          900: '#172554',
          950: '#0F172A',
        },
        // Regional Accent: Forest Emerald (#15803D, #16A34A, #DCFCE7)
        emerald: {
          DEFAULT: '#16A34A',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
        },
        // Regional Accent: Warm Saffron (#D97706, #B45309, #FEF3C7)
        accent: {
          DEFAULT: '#D97706',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Charcoal Slate Text & Borders
        border: '#E2E8F0',
        background: '#FFFFFF',
        foreground: '#0F172A',
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#334155',
          subdued: '#64748B',
        },
      },
      boxShadow: {
        'card-subtle': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
      },
      animation: {
        'namaste-rise': 'namasteRise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-ring': 'pulseRing 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser-sweep': 'laserSweep 1.5s ease-in-out infinite',
      },
      keyframes: {
        namasteRise: {
          '0%': { transform: 'translateY(14px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseRing: {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.4' },
          '50%': { transform: 'scale(1.12)', opacity: '0.85' },
        },
        laserSweep: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
