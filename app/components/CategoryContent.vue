<template>
  <div class="row">
    <Card v-bind="card" v-for="card in cards?.filter((dummy, index) => (currentPagination ? index < currentPagination : true))" inArray />

    <div v-if="pagination && currentPagination < cards.length" class="col-xs-12 my-10">
      <button class="button" @click.stop="viewMore">{{ $t("viewMore") }}</button>
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
const { category, pagination, height, background } = content || {}
const currentPagination = ref(pagination)

const { data: items, refresh } = await useAsyncData(`${category}-${locale.value}.json`, () =>
  $fetch(`${resourcesUrl}/content/${category}/index_${locale.value}.json`),
)

watch(locale, () => refresh())

function viewMore() {
  currentPagination.value += pagination
}

const cards = items.value?.map(item => {
  const href =
    item.uri?.startsWith("http") || item.uri?.startsWith("/imp")
      ? item.videoSrc || item.youtubeSrc
        ? ""
        : item.uri
      : `/${locale.value}/${category}/${item.uri}`

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
          url: encodeURI((item.storyTitleImg ? item.storyTitleImg : "") || item.imgSrc || item.uri),
          type: item.videoSrc ? "video" : item.youtubeSrc ? "videoIframe" : undefined,
          position: background?.position || "bottom",
          size: background?.size,
          borderRadius: background?.borderRadius || "5px",
        },
      },
      middle: {
        moduleTemplate: "promo",
        suphead: {
          text: item.category,
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
          text: `${itemDate}<br>${item.readingMinutes ? ` ${item.readingMinutes} ${loc("readingMinutes")}` : ""}`,
          color: "black-lightest",
        },
      },
    },
  }
})
</script>
