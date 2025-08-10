
const resourcesUrl = (process.env.NODE_ENV === "production" ? "" : `http://localhost`) + "/imp/website"

export default defineI18nLocale(locale => {
  // for example, fetch locale messages from nuxt server
  return $fetch(`${resourcesUrl}/pages/${locale}/_i18n.json`)
})