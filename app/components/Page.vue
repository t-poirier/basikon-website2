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
import { ref, watch } from "vue"

const { pageName, pageCategory } = defineProps({
  pageName: String,
  pageCategory: String,
})

const router = useRouter()
const { locale } = useI18n()
const notFoundPagePath = `/${locale.value}/404`

const cards = ref([])

function getItemCards({ item, markdownText }) {
  if (pageCategory === "customers-success-stories") {
    return [
      {
        background: { color: "ice-mist" },
        blocks: {
          top: {
            headline: {
              text: item.title,
              color: "midnight-blue-lightest",
              fontWeight: "normal",
            },
          },
          middle: {
            suphead: {
              text: `“${item.quote?.text}“`,
              color: "midnight-blue-lightest",
              fontStyle: "italic",
              fontWeight: "normal",
            },
          },
          bottom: {
            suphead: {
              text: item.quote?.author,
              color: "midnight-blue-lightest",
              fontWeight: "bold",
            },
          },
        },
      },
      {
        show: item.logoImg,
        height: "100px",
        background: { url: item.logoImg, size: "15%" },
      },
      {
        align: "side",
        markdown: { text: item.companyBrief?.join("\n") },
      },
      {
        align: "side",
        markdown: { text: markdownText.value },
      },
      { height: "100px" },
    ]
  }

  return [
    {
      background: { color: "ice-mist" },
      height: "300px",
      blocks: {
        top: {
          headline: {
            text: item.title,
            color: "midnight-blue-lightest",
            fontWeight: "normal",
          },
          subhead: {
            text: item.desc || item.meta,
            color: "midnight-blue-lightest",
            fontWeight: "normal",
          },
        },
      },
    },
    { align: "side", markdown: { text: markdownText.value } },
    {
      markdown: {
        text: item.date
          ? new Date(item.date).toLocaleString(locale.value, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
      },
    },
    {
      height: "150px",
    },
    {
      categoryList: {
        category: pageCategory,
        pagination: 3,
      },
    },
    {
      height: "150px",
    },
  ]
}

if (pageCategory) {
  const { data: categoryItems, refresh: refreshCategoryIndex } = await useAsyncData(`${pageCategory}-${locale.value}.json`, () =>
    $fetch(`${resourcesUrl}/content/${pageCategory}/index_${locale.value}.json`),
  )

  const categoryItem = categoryItems.value?.find(categoryItem => categoryItem?.uri === pageName)
  if (categoryItem) {
    const { data: markdownText, refresh: refreshMarkdown } = await useAsyncData(`${pageCategory}-${pageName}-${locale.value}.md`, () =>
      $fetch(`${resourcesUrl}/content/${pageCategory}/${pageName}/${locale.value}.md`),
    )

    cards.value = getItemCards({ item: categoryItem, markdownText })

    watch(locale, async () => {
      await refreshCategoryIndex()
      await refreshMarkdown()
    })

    useHead({
      title: categoryItem.title,
      meta: [
        { name: "description", content: categoryItem.desc || categoryItem.meta },
        { property: "og:title", content: categoryItem.title },
      ],
    })
  } else {
    router.push(notFoundPagePath)
  }
} else {
  // files starting with _ are not pages
  if (pageName.startsWith("_")) {
    router.push(notFoundPagePath)
  } else {
    const [{ data, refresh: refreshFragments }, { data: page, refreshPage }] = await Promise.all([
      useAsyncData(`_fragments-${locale.value}`, () => $fetch(`${resourcesUrl}/pages/${locale.value}/_fragments.json`)),
      useAsyncData(`${pageName}-${locale.value}`, () => $fetch(`${resourcesUrl}/pages/${locale.value}/${pageName}.json`)),
    ])
    const { fragments } = data.value || {}

    if (page.value?.cards) {
      for (let i = 0; i < page.value.cards.length; i++) {
        const cardOrArray = page.value.cards[i]
        if (Array.isArray(cardOrArray)) {
          for (let j = 0; j < cardOrArray.length; j++) {
            const card = cardOrArray[j]
            const fragment = fragments?.find(fragment => fragment.id === card.fragmentId)
            if (fragment) {
              page.value.cards[i][j] = fragment
            }
          }
        } else {
          if (cardOrArray.fragmentId) {
            const fragment = fragments?.find(fragment => fragment.id === cardOrArray.fragmentId)
            if (fragment) {
              page.value.cards[i] = fragment
            }
          }
        }
      }

      cards.value = page.value.cards

      watch(locale, async () => {
        await refreshFragments()
        await refreshPage()
      })

      useHead(page.value.head)
    } else {
      router.push(notFoundPagePath)
    }
  }
}
</script>
