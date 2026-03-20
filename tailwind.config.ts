import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C0392B',
        secondary: '#F39C12',
        accent: '#1ABC9C',
        dark: '#1A1A1A',
        cream: '#FDF6EC',
        brown: '#8B4513',
        pink: '#FF6B9D',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        accent: ['var(--font-caveat)', 'cursive'],
      },
    },
  },
  plugins: [],
}

export default config
