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

function setPageWithCategory () {
  
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
    cards = [
      {
        height: "300px",
        blocks: {
          middle: {
            headline: {
              text: _categoryItem.title,
            },
          },
        },
      },
      {
        blocks: {
          markdown: {
            text: data.value,
          },
        },
      },
    ]

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
