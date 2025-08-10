
import { resourcesUrl } from "@/services/utils"

export default defineI18nLocale(locale => {
  // for example, fetch locale messages from nuxt server
  return $fetch(`${resourcesUrl}/pages/${locale}/_i18n.json`)
})