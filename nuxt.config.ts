// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3005
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],
  i18n: {
    langDir: 'locales/',
    locales: [
      {
        code: 'en',
        name: 'English',
        files: ['ext.js']
      },
      {
        code: 'fr',
        name: 'Français',
        files: ['ext.js']
      },
      {
        code: 'es',
        name: 'Español',
        files: ['ext.js']
      },
      {
        code: 'de',
        name: 'Deutsch',
        files: ['ext.js']
      },
      {
        code: 'it',
        name: 'Italiano',
        files: ['ext.js']
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
  },
  sitemap: {}
})
