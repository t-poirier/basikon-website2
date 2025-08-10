// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3005
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],
  i18n: {
    langDir: '../app/services/',
    locales: [
      {
        code: 'en',
        name: 'English',
        files: ['i18n.js']
      },
      {
        code: 'fr',
        name: 'Français',
        files: ['i18n.js']
      },
      {
        code: 'es',
        name: 'Español',
        files: ['i18n.js']
      },
      {
        code: 'de',
        name: 'Deutsch',
        files: ['i18n.js']
      },
      {
        code: 'it',
        name: 'Italiano',
        files: ['i18n.js']
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
  },
  sitemap: {}
})
