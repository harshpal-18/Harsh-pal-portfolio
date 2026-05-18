/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f5f5f2',
          50: '#fafaf8',
          100: '#f8f8f6',
          200: '#f3f2ee',
          300: '#eaeae6',
          400: '#e0e0dc',
          500: '#d4d4d0',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.65)',
          hover: 'rgba(255,255,255,0.80)',
          border: 'rgba(0,0,0,0.06)',
          strong: 'rgba(255,255,255,0.90)',
        },
        text: {
          primary: '#111111',
          secondary: '#3f3f46',
          muted: '#71717a',
          faint: '#a1a1aa',
          ghost: '#d4d4d8',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0,0,0,0.04)',
        'card': '0 4px 24px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.04)',
        'pill': '0 2px 20px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
        'elevated': '0 12px 48px rgba(0,0,0,0.06)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
