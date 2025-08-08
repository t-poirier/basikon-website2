<template>
  <Card v-for="card in cards" v-bind="card" />
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
import { watch } from "vue"

const { pageName } = defineProps({
  pageName: String,
})

const { locale } = useI18n()
const { data: page, refresh } = await useAsyncData(`${pageName}-${locale.value}`, () =>
  $fetch(`${resourcesUrl}/pages/${locale.value}/${pageName}.json`),
)
const { head, cards } = page.value || {}

watch(locale, () => refresh())
useHead(head)
</script>
