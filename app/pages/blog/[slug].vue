<template>
  <div class="col-xs-12">
    <div class="max-w-5xl m-auto">
      <MdContent :markdown="markdown" />
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
import { watch } from 'vue'

const { locale } = useI18n()
const route = useRoute()
const { slug } = route.params
const { data: markdown, refresh } = await useAsyncData(`post-${slug}`, () => $fetch(`${resourcesUrl}/content/blog/${slug}/${locale.value}.md`))

watch(locale, () => {
  refresh()
})

// useHead({
//   title: post?.value?.title,
//   meta: [
//     { name: "description", content: post?.value?.description },
//     { property: "og:title", content: post?.value?.title },
//   ],
// })
</script>
