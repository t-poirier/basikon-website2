<template>
  <div v-for="card in cards" class="row">
    <div class="col-xs-12" v-if="Array.isArray(card)">
      <div class="row">
        <Card v-bind="row" v-for="row in card" inArray :messages="messages" />
      </div>
    </div>
    <Card v-else v-bind="card" :messages="messages" />
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
const messages = ref({})

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
    const [messagesRef, pageRef] = await Promise.allSettled([
      useAsyncData(`messages-${pageName}-${locale.value}`, () => $fetch(`${resourcesUrl}/pages/${locale.value}/messages/${pageName}.json`)),
      useAsyncData(`${pageName}-${locale.value}`, () => $fetch(`${resourcesUrl}/pages/${locale.value}/${pageName}.json`)),
    ])
    const { data: _messages, refresh: refreshMessages } = messagesRef.value || {}
    const { data: page, refreshPage } = pageRef.value || {}

    messages.value = _messages.value

    const fragmentsToCollect = new Set()
    if (page.value?.cards) {
      for (let i = 0; i < page.value.cards.length; i++) {
        const cardOrArray = page.value.cards[i]
        if (Array.isArray(cardOrArray)) {
          for (let j = 0; j < cardOrArray.length; j++) {
            const card = cardOrArray[j]
            if (card.fragmentId) fragmentsToCollect.add(card.fragmentId)
          }
        } else if (cardOrArray.fragmentId) {
          fragmentsToCollect.add(cardOrArray.fragmentId)
        }
      }

      if (fragmentsToCollect.size) {
        const fragments = await Promise.all(
          Array.from(fragmentsToCollect).map(fragmentId => {
            return useAsyncData(`fragments-${fragmentId}-${locale.value}`, () =>
              $fetch(`${resourcesUrl}/pages/${locale.value}/fragments/${fragmentId}.json`),
            )
          }),
        )

        for (let i = 0; i < page.value.cards.length; i++) {
          const cardOrArray = page.value.cards[i]
          if (Array.isArray(cardOrArray)) {
            for (let j = 0; j < cardOrArray.length; j++) {
              const card = cardOrArray[j]
              const fragment = fragments?.find(fragment => fragment.data.value.id === card.fragmentId)
              if (fragment) {
                page.value.cards[i][j] = fragment.data.value
              }
            }
          } else {
            if (cardOrArray.fragmentId) {
              const fragment = fragments?.find(fragment => fragment.data.value.id === cardOrArray.fragmentId)
              if (fragment) {
                page.value.cards[i] = fragment.data.value
              }
            }
          }
        }

        const fragmentsMessages = await Promise.all(
          Array.from(fragmentsToCollect).map(fragmentId => {
            return useAsyncData(`fragments-${fragmentId}-messages-${locale.value}`, () =>
              $fetch(`${resourcesUrl}/pages/${locale.value}/messages/${fragmentId}.json`),
            )
          }),
        )

        for (const fragmentMessages of fragmentsMessages) {
          Object.assign(messages.value, fragmentMessages.data.value)
        }
      }

      cards.value = page.value.cards

      watch(locale, async () => {
        await refreshMessages()
        await refreshPage()
      })

      useHead(page.value.head)
    } else {
      router.push(notFoundPagePath)
    }
  }
}
</script>
