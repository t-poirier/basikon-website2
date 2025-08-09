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
        files: ['en/index.json']
      },
      {
        code: 'fr',
        name: 'Français',
        files: ['fr/index.json']
      },
      {
        code: 'es',
        name: 'Español',
        files: ['es/index.json']
      },
      {
        code: 'de',
        name: 'Deutsch',
        files: ['de/index.json']
      },
      {
        code: 'it',
        name: 'Italiano',
        files: ['it/index.json']
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
  },
  sitemap: {}
})
