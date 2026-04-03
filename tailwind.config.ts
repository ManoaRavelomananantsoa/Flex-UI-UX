import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cyan: {
          400: '#29b6e8',
          500: '#00cfff',
          600: '#00b4d4',
        },
        blue: {
          400: '#1a8fff',
          500: '#0099ff',
          600: '#0080ff',
        }
      },
      animation: {
        'glitch-main': 'glitch-main 0.3s infinite',
        'glitch-r': 'glitch-r 0.3s infinite',
        'glitch-c': 'glitch-c 0.3s infinite',
        'slice': 'slice 0.5s infinite',
        'blink-cur': 'blink-cur 1s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        'glitch-main': {
          '0%, 92%, 100%': { transform: 'translate(0)' },
          '93%': { transform: 'translate(-3px, 1px)' },
          '94%': { transform: 'translate(3px, -1px)' },
          '95%': { transform: 'translate(-2px, 0)' },
          '96%': { transform: 'translate(2px, 1px)' },
          '97%': { transform: 'translate(0)' },
        },
        'glitch-r': {
          '0%, 92%, 97%, 100%': { opacity: '0', transform: 'translate(0)' },
          '93%': { opacity: '.7', transform: 'translate(4px, 0) skewX(2deg)' },
          '94%': { opacity: '.5', transform: 'translate(-4px, 1px)' },
          '95%': { opacity: '.6', transform: 'translate(3px, -1px) skewX(-1deg)' },
          '96%': { opacity: '0' },
        },
        'glitch-c': {
          '0%, 92%, 97%, 100%': { opacity: '0', transform: 'translate(0)' },
          '93%': { opacity: '.6', transform: 'translate(-4px, -1px) skewX(-2deg)' },
          '94%': { opacity: '.7', transform: 'translate(4px, 0)' },
          '95%': { opacity: '.4', transform: 'translate(-3px, 1px)' },
          '96%': { opacity: '0' },
        },
        'slice': {
          '0%, 91%, 97%, 100%': { opacity: '0' },
          '92%': { opacity: '1', top: '30%' },
          '93%': { opacity: '.8', top: '60%' },
          '94%': { opacity: '1', top: '20%' },
          '95%': { opacity: '.6', top: '75%' },
          '96%': { opacity: '0' },
        },
        'blink-cur': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fadeIn': {
          'to': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
