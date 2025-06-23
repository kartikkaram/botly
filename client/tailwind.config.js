// tailwind.config.js
import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: { DEFAULT: 'hsl(var(--border) / <alpha-value>)' },
        input: { DEFAULT: 'hsl(var(--input) / <alpha-value>)' },
        ring: { DEFAULT: 'hsl(var(--ring) / <alpha-value>)' },
        background: { DEFAULT: 'hsl(var(--background) / <alpha-value>)' },
        foreground: { DEFAULT: 'hsl(var(--foreground) / <alpha-value>)' },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background) / <alpha-value>)',
          foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
          primary: 'hsl(var(--sidebar-primary) / <alpha-value>)',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
          accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
          border: 'hsl(var(--sidebar-border) / <alpha-value>)',
          ring: 'hsl(var(--sidebar-ring) / <alpha-value>)',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        dark: {
          900: '#121212',
          800: '#1e1e1e',
          700: '#2d2d2d',
          600: '#3d3d3d',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'orange-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.7s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.7s ease-out forwards',
        'orange-slow': 'orange-slow 3s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
        'hero-gradient-2': 'linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)',
        'orange-gradient': 'linear-gradient(180deg, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Brockmann', 'SF Pro Display', 'Inter', 'sans-serif'],
        brockmann: ['Brockmann', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        elegant: '0 4px 20px rgba(0, 0, 0, 0.08)',
        'elegant-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [tailwindcssAnimate()],
};
