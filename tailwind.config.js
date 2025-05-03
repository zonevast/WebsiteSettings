/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/app/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A855F7', // Soft Indigo - Calming, Professional, Gradient-Friendly
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#F472B6', // Soft Pink – friendly contrast to indigo
          foreground: '#ffffff',
        },
        neutral: {
          DEFAULT: '#64748b',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#059669',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#d97706',
          foreground: '#ffffff',
        },
        error: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
        info: {
          DEFAULT: '#0284c7',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#0891b2',
          foreground: '#ffffff',
        },
      },
      // ... rest of your existing theme configuration ...
      gradientColorStops: {
        'primary-start': '#6366F1',
        'primary-end': '#8B5CF6',  // Slightly lighter indigo/purple
        'secondary-start': '#A855F7',
        'secondary-end': '#D8B4FE',  // Lighter lavender
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#6366F1', // Soft Indigo
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#A855F7', // Muted Purple
              foreground: '#ffffff',
            },
            focus: '#6366F1',
            content1: '#f8fafc',
            content2: '#f1f5f9',
            content3: '#e2e8f0',
            content4: '#cbd5e1',
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#A78BFA', // Lighter Indigo for dark mode
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#C084FC', // Lighter Purple for dark mode
              foreground: '#ffffff',
            },
            focus: '#A78BFA',
            content1: '#1e293b',
            content2: '#334155',
            content3: '#475569',
            content4: '#64748b',
          },
        },
      },
    }),
  ],
};