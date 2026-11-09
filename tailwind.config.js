/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0E14',
          surface: '#0D1117',
          card: '#161B22',
          border: '#30363D',
          hover: '#21262D',
          subtext: '#8B949E',
          text: '#C9D1D9',
          heading: '#F0F6FC'
        },
        light: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: '#F1F5F9',
          border: '#E2E8F0',
          hover: '#E2E8F0',
          subtext: '#475569',
          text: '#1E293B',
          heading: '#0F172A'
        },
        accent: {
          blue: '#0284C7',
          electric: '#0077B5',
          cyan: '#38BDF8',
          warm: '#F59E0B',
          warmLight: '#FBBF24',
          emerald: '#10B981',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}

