<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { resourcesUrl, setLocaleMessages } from "@/services/utils"
import { watch } from "vue"

const { locale } = useI18n()
const { data, refresh: refreshI18n } = await useAsyncData(`_i18n-${locale.value}`, () => $fetch(`${resourcesUrl}/pages/${locale.value}/_i18n.json`))

setLocaleMessages(locale.value, data.value)

watch(locale, async () => {
  await refreshI18n()
  setLocaleMessages(locale.value, data.value)
})
</script>

<style lang="scss">
@use "~/assets/scss/index.scss";
</style>
