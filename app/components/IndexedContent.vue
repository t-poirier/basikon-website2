<template>
  <div class="row">
    <Card v-bind="card" v-for="card in cards" inArray />
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
import { watch } from "vue"

const { type } = defineProps({
  type: String,
})

const { locale } = useI18n()

const { data: items, refresh } = await useAsyncData(`${type}-${locale.value}.json`, () =>
  $fetch(`${resourcesUrl}/content/${type}/index_${locale.value}.json`),
)

watch(locale, () => refresh())

const cards = items.value?.map(item => {
  const href =
    item.uri?.startsWith("http") || item.uri?.startsWith("/imp")
      ? item.videoSrc || item.youtubeSrc
        ? ""
        : item.uri
      : `/${locale.value}/${type}/${item.uri}`

  return {
    sm: "4",
    maxWidth: "400px",
    background: {
      href,
      // url: item.uri,
      // type: item.videoSrc ? "video" : item.youtubeSrc ? "videoIframe" : undefined,
    },
    blocks: {
      align: "side",
      top: {
        height: "300px",
        background: {
          href,
          // url: item.imgSrc,
      url: item.imgSrc || item.uri,
      type: item.videoSrc ? "video" : item.youtubeSrc ? "videoIframe" : undefined,
          position: "bottom",
          borderRadius: "rounded",
        },
      },
      bottom: {
        moduleTemplate: "promo",
        subhead: {
          text: item.title,
          fontWeight: "bold",
        },
        summary: {
          text: item.desc || item.meta,
        },
      },
    },
  }
})
</script>
