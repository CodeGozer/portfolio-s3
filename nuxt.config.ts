import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  experimental: {
    appManifest: false,
  },
  css: ['~/assets/styles.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    }
  },
  ssr: false,
  app: {
    head: {
      title: 'Nico Kornuijt Portfolio',
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/vault-boy-clean.jpg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=VT323&display=swap' }
      ]
    }
  }
})
