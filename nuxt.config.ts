// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    langDir: 'locales/',
    locales: [
      {
        code: 'en',
        name: 'English',
        files: ['en/index.json', 'en/about.json']
      },
      {
        code: 'fr',
        name: 'Français',
        files: ['fr/index.json', 'fr/about.json']
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
  }
})
