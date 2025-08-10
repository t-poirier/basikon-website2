<template>
  <div class="row">
    <Card v-bind="card" v-for="card in cards?.filter((dummy, index) => (currentPagination ? index < currentPagination : true))" inArray />

    <div v-if="pagination && currentPagination < cards.length" class="col-xs-12 my-10">
      <button class="button" @click.stop="viewMore">{{ $t("View more") }}</button>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
import { ref, watch } from "vue"

const { content } = defineProps({
  content: Object,
})

const { locale, t: loc } = useI18n()
const { category, pagination, topBlockHeight, maxWidth, sm, background } = content || {}
const currentPagination = ref(pagination)

const { data: items, refresh } = await useAsyncData(`${category}-${locale.value}.json`, () =>
  $fetch(`${resourcesUrl}/content/${category}/index_${locale.value}.json`),
)

watch(locale, () => refresh())

function viewMore() {
  currentPagination.value += pagination
}

const cards = items.value?.map(item => {
  const itemUri = item.uri || item.url
  const isExternalUri = item.isExternalUri || itemUri?.startsWith("http")
  const href =
    isExternalUri || itemUri?.startsWith("/imp")
      ? item.videoSrc || item.youtubeSrc
        ? ""
        : itemUri
      : itemUri.startsWith(`/${locale.value}`)
        ? itemUri
        : `/${locale.value}/${category}/${itemUri}`

  const itemDate = item.date
    ? new Date(item.date).toLocaleString(locale.value, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  return {
    sm: sm || "4",
    maxWidth: maxWidth || "400px",
    background: {
      href,
      hrefTarget: isExternalUri ? "_blank" : "",
      hrefOverlay: true,
    },
    align: "side",
    blocks: {
      top: {
        height: topBlockHeight || "300px",
        background: {
          url: encodeURI((item.storyTitleImg ? item.storyTitleImg : "") || item.imgSrc || itemUri),
          type: item.videoSrc ? "video" : item.youtubeSrc ? "videoIframe" : undefined,
          position: background?.position || "bottom",
          size: background?.size,
          borderRadius: background?.borderRadius || "5px",
        },
      },
      middle: {
        moduleTemplate: "promo",
        suphead: {
          text: item.category || item.label,
        },
        subhead: {
          text: item.storyTitle || item.title,
          fontWeight: "bold",
        },
        summary: {
          text: item.desc || item.meta,
        },
      },
      bottom: {
        moduleTemplate: "promo",
        suphead: {
          text: `${itemDate}\n${item.readingMinutes ? ` ${item.readingMinutes} ${loc("reading minutes")}` : ""}`,
          color: "black-lightest",
        },
      },
    },
  }
})
</script>
