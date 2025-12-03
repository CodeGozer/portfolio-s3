/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        crt: '#33ff66',
        hud: {
          line: '#33ff66',
          glow: 'rgba(51, 255, 102, 0.35)',
        },
        hazard: '#ffcc00',
      },
      fontFamily: {
        vt323: ['VT323', 'Courier New', 'Consolas', 'monospace'],
      },
      boxShadow: {
        hud: '0 0 8px rgba(51,255,102,0.3)',
      },
      keyframes: {
        'crt-flicker': {
          '0%, 100%': { opacity: '0.97' },
          '50%': { opacity: '1' },
        },
        'hud-pulse': {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
        'scanline-shimmer': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'crt-flicker': 'crt-flicker 11s infinite',
        'hud-pulse': 'hud-pulse 2s infinite',
        'scanline-shimmer': 'scanline-shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
