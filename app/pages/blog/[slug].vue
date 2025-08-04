<template>
  <div class="col-xs-12">
    <div class="max-w-5xl m-auto">
      <MdContent :markdown="markdown" />
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
const { locale: currentLocale } = useI18n()
const route = useRoute()
const { slug } = route.params
const { data: markdown } = await useAsyncData(`post-${slug}`, () => $fetch(`${resourcesUrl}/content/blog/${slug}/${currentLocale.value}.md`))

// useHead({
//   title: post?.value?.title,
//   meta: [
//     { name: "description", content: post?.value?.description },
//     { property: "og:title", content: post?.value?.title },
//   ],
// })
</script>
