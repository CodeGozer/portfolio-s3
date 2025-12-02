import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  css: ['~/assets/styles.css'],
  ssr: false,
  app: {
    head: {
      title: 'Retro Console',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=VT323&display=swap' }
      ]
    }
  }
})
