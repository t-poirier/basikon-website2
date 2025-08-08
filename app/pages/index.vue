<template>
  <Card v-for="card in cards" v-bind="card" />
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
import { watch } from "vue"

const { locale } = useI18n()
const { data: page, refresh } = await useAsyncData(`index-${locale.value}`, () => $fetch(`${resourcesUrl}/pages/${locale.value}/index.json`))
const { head, cards } = page.value || {}

watch(locale, () => {
  refresh()
})

useHead(head)
</script>

<style lang="scss">
@use "~/assets/scss/index.scss";
</style>
