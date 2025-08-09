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

function getItemCards({ item, data }) {
  if (pageCategory === "customers-success-stories") {
    return [
      {
        background: {
          color: "ice-mist",
        },
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
              text: "“" + item.quote?.text + "“",
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
        background: {
          url: item.logoImg,
          size: "15%"
        },
      },
      {
        blocks: {
          align: "side",
          markdown: {
            text: item.companyBrief?.join("<br>"),
          },
        },
      },
      {
        blocks: {
          align: "side",
          markdown: {
            text: data.value,
          },
        },
      },
      {
        height: "100px"
      },
    ]
  }

  return [
    {
      background: {
        color: "ice-mist",
      },
      height: "300px",
      blocks: {
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
    {
      blocks: {
        align: "side",
        markdown: {
          text: data.value,
        },
      },
    },
    {
      blocks: {
        markdown: {
          text: item.date
            ? new Date(item.date).toLocaleString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "",
        },
      },
    },
  ]
}

let cards = ref([])
if (pageCategory) {
  const { data: categoryItems, refresh: refreshCategoryIndex } = await useAsyncData(`${pageCategory}-${pageName}-${locale.value}.index`, () =>
    $fetch(`${resourcesUrl}/content/${pageCategory}/index_${locale.value}.json`),
  )
  let _categoryItem
  for (const categoryItem of categoryItems.value) {
    if (categoryItem?.uri === pageName) {
      _categoryItem = categoryItem
      break
    }
  }

  if (_categoryItem) {
    const { data, refresh: refreshMarkdown } = await useAsyncData(`${pageCategory}-${pageName}-${locale.value}.md`, () =>
      $fetch(`${resourcesUrl}/content/${pageCategory}/${pageName}/${locale.value}.md`),
    )
    cards = getItemCards({ item: _categoryItem, data })

    watch(locale, async () => {
      await refreshCategoryIndex()
      await refreshMarkdown()
    })
    useHead({
      title: _categoryItem.title,
      meta: [
        {
          name: "description",
          content: _categoryItem.desc || _categoryItem.meta,
        },
        {
          property: "og:title",
          content: _categoryItem.title,
        },
      ],
    })
  } else {
    router.push("/404")
  }
} else {
  const { data: page, refresh } = await useAsyncData(`${pageName}-${locale.value}`, () =>
    $fetch(`${resourcesUrl}/pages/${locale.value}/${pageName}.json`),
  )

  cards = page.value?.cards
  const head = page.value?.head

  if (cards) {
    watch(locale, () => refresh())
    useHead(head)
  } else {
    router.push("/404")
  }
}
</script>
