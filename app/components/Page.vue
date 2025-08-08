<template>
  <div v-for="card in cards" class="row">
    <div class="col-xs-12" v-if="Array.isArray(card)">
      <div class="row">
        <Card v-bind="row" v-for="row in card" inArray />
      </div>
    </div>
    <Card v-else v-bind="card" />
  </div>
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

if (cards) {
  watch(locale, () => refresh())
  useHead(head)
} else {
  const router = useRouter()
  router.push("/404")
}
</script>
