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
        navy: {
          50: '#F0F4FC',
          100: '#E1E9F9',
          200: '#C3D3F3',
          300: '#95B3EA',
          400: '#5F8FDE',
          500: '#3A6ED0',
          600: '#2352B4',
          700: '#193F8E',
          800: '#14316D',
          900: '#0B1F52',
          950: '#071333',
        },
        royal: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        gold: {
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
      },
      fontFamily: {
        heading: ['Poppins', 'Manrope', 'sans-serif'],
        sans: ['Inter', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(11, 31, 82, 0.08), 0 4px 6px -2px rgba(11, 31, 82, 0.04)',
        'premium-hover': '0 20px 40px -15px rgba(11, 31, 82, 0.15), 0 8px 12px -4px rgba(11, 31, 82, 0.08)',
        'glow-royal': '0 0 25px rgba(37, 99, 235, 0.25)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
