import { defaultLocale, resourcesUrl } from "@/services/utils"

export default defineI18nLocale(async locale => {
  // for example, fetch locale messages from nuxt server
  let messages
  try {
    messages = await $fetch(`${resourcesUrl}/pages/${locale}/messages/index.json`)
  } catch (error) {
    messages = await $fetch(`${resourcesUrl}/pages/${defaultLocale}/messages/index.json`)
  }
  return messages
})
