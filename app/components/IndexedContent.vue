<template>
  <div class="row">
    <Card v-bind="card" v-for="card in cards" inArray />
    <div class="col-xs-12 my-10">
      <button class="button">{{ $t("viewMore") }}</button>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
import { watch } from "vue"

const { content } = defineProps({
  content: Object,
})

const { locale, t: loc } = useI18n()
const { type, pagination, height, background } = content || {}

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

  const itemDate = item.date
    ? new Date(item.date).toLocaleString(locale.value, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return {
    sm: "4",
    maxWidth: "400px",
    background: {
      href,
      hrefOverlay: true,
    },
    blocks: {
      align: "side",
      top: {
        height: height || "300px",
        background: {
          url: item.imgSrc || item.uri,
          type: item.videoSrc ? "video" : item.youtubeSrc ? "videoIframe" : undefined,
          position: background?.position || "bottom",
          size: background?.size,
          borderRadius: "rounded",
        },
      },
      middle: {
        moduleTemplate: "promo",
        subhead: {
          text: item.title,
          fontWeight: "bold",
        },
        summary: {
          text: item.desc || item.meta,
        },
      },
      bottom: {
        moduleTemplate: "promo",
        suphead: {
          text: `${itemDate}<br>${item.readingMinutes ? ` ${item.readingMinutes} ${loc("readingMinutes")}` : ""}`,
          color: "black-lightest",
        },
      },
    },
  }
})
</script>
