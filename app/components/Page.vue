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
import { defaultLocale, resourcesUrl } from "@/services/utils"
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
  const categoryKeyUrl = `${resourcesUrl}/content/${pageCategory}/index_${locale.value}.json`
  const categoryMdKeyUrl = `${resourcesUrl}/content/${pageCategory}/${pageName}/${locale.value}.md`

  const { data: categoryItems, refresh: refreshCategoryIndex } = await useAsyncData(categoryKeyUrl, () => $fetch(categoryKeyUrl))

  const categoryItem = categoryItems?.value?.find(categoryItem => categoryItem?.uri === pageName)
  if (categoryItem) {
    const { data: markdownText, refresh: refreshMarkdown } = await useAsyncData(categoryMdKeyUrl, () => $fetch(categoryMdKeyUrl))

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
  const messagesKeyUrl = `${resourcesUrl}/pages/${locale.value}/messages/${pageName}.json`
  const pageKeyUrl = `${resourcesUrl}/pages/${locale.value}/${pageName}.json`

  const [messagesRef, pageRef] = await Promise.allSettled([
    useAsyncData(messagesKeyUrl, () => $fetch(messagesKeyUrl)),
    useAsyncData(pageKeyUrl, () => $fetch(pageKeyUrl)),
  ])
  const { data: _messages, refresh: refreshMessages } = messagesRef?.value || {}
  const { data: localePage, refresh: localeRefreshPage } = pageRef?.value || {}

  let page = localePage?.value
  let refreshPage = localeRefreshPage
  if (!page) {
    const defaultPageKeyUrl = `${resourcesUrl}/pages/${defaultLocale}/${pageName}.json`
    const pageRef = await useAsyncData(defaultPageKeyUrl, () => $fetch(defaultPageKeyUrl))
    page = pageRef.data.value
    refreshPage = pageRef.refresh
  }

  messages.value = _messages?.value || {}

  const fragmentsToCollect = new Set()
  if (page?.cards) {
    for (let i = 0; i < page.cards.length; i++) {
      const cardOrArray = page.cards[i]
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
      const fragmentsPromises = []
      const fragmentsMessagesPromises = []
      for (const fragmentId of fragmentsToCollect) {
        const fragmentKeyUrl = `${resourcesUrl}/pages/${locale.value}/fragments/${fragmentId}.json`
        const fragmentMessagesKeyUrl = `${resourcesUrl}/pages/${locale.value}/messages/${fragmentId}.json`

        fragmentsPromises.push(useAsyncData(fragmentKeyUrl, () => $fetch(fragmentKeyUrl)))
        fragmentsMessagesPromises.push(useAsyncData(fragmentMessagesKeyUrl, () => $fetch(fragmentMessagesKeyUrl)))
      }

      const fragments = await Promise.allSettled(fragmentsPromises)
      const fragmentsMessages = await Promise.allSettled(fragmentsMessagesPromises)

      for (let i = 0; i < page.cards.length; i++) {
        const cardOrArray = page.cards[i]
        if (Array.isArray(cardOrArray)) {
          for (let j = 0; j < cardOrArray.length; j++) {
            const card = cardOrArray[j]
            if (card.fragmentId) {
              const fragment = fragments?.find(fragment => {
                return fragment.value?.data?.value?.id === card.fragmentId
              })
              if (fragment) {
                page.cards[i][j] = fragment?.value?.data?.value
              }
            }
          }
        } else if (cardOrArray.fragmentId) {
          const fragment = fragments?.find(fragment => {
            return fragment.value?.data?.value?.id === cardOrArray.fragmentId
          })
          if (fragment) {
            page.cards[i] = fragment.value?.data?.value
          }
        }
      }

      for (const fragmentMessages of fragmentsMessages) {
        Object.assign(messages.value, fragmentMessages?.value?.data?.value || {})
      }
    }

    cards.value = page?.cards

    watch(locale, async () => {
      await refreshMessages()
      await refreshPage()
    })

    useHead({
      ...(page?.head || {}),
      title: messages.value?.[page?.head?.title] || page?.head?.title,
      meta: page?.head?.meta?.map(meta => {
        return {
          name: meta?.name,
          content: messages.value?.[meta?.content] || meta?.content,
        }
      }),
    })
  } else {
    router.push(notFoundPagePath)
  }
}
</script>
