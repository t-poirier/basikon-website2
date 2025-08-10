<template>
  <div class="markdown w-full max-w-[940px] text-lg px-[2.5%]" v-if="htmlContent" v-html="htmlContent"></div>
</template>

<script setup>
import { getMarkedInstance, resourcesUrl } from "@/services/utils"
import { ref } from "vue"

const { markdown } = defineProps({
  markdown: Object,
})
const localePath = useLocalePath()
const { locale } = useI18n()
const markedInstance = getMarkedInstance({ localePath, useHeadingAnchors: true })

const text = ref("")
if (markdown.url) {
  const { data, refresh } = await useAsyncData(`${resourcesUrl}${markdown.url}`, () => $fetch(`${resourcesUrl}${markdown.url}`))
  text.value = data.value
  watch(locale, refresh)
} else {
  text.value = markdown?.text
}
const htmlContent = markedInstance.parse(text.value.replaceAll("$v{resourcesUrl}", resourcesUrl))
</script>

<style scoped lang="scss">
.markdown :deep() {
  --heading-color: var(--color-midnight-blue-lightest);

  hr {
    border-color: var(--heading-color);
    margin-left: 0;
    max-width: 70%;
  }

  p {
    color: var(--text-color);
    font-weight: 300;
    margin-top: 0;
    margin-bottom: 32px;
  }

  ol,
  ul {
    list-style-type: disc;
    margin: 16px 0;
    padding-left: 18px;

    li a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  ul,
  li {
    color: var(--text-color);
    font-weight: 300;
  }

  h1 {
    color: var(--heading-color);
    font-size: 3rem;
    font-weight: bold;
    line-height: 3.3rem;
    padding: 32px 0 16px;
  }

  h2 {
    color: var(--heading-color);
    font-size: 2rem;
    font-weight: bold;
    line-height: 2.3rem;
    margin-bottom: -10px;
    margin: 0;
    padding: 32px 0 16px;
  }

  h2.md-header:not(:first-child) {
    position: relative;

    &::before {
      content: "";
      border-top: 1px solid var(--heading-color);
      display: block;
      height: 1px;
      position: absolute;
      top: 8px;
      width: 70%;
    }
  }

  h3 {
    color: var(--heading-color);
    font-size: 1.6rem;
    font-weight: bold;
    line-height: 1.9rem;
    margin: 24px 0 12px;
  }

  h4 {
    color: var(--heading-color);
    margin: 24px 0 12px;
  }

  // this heading level is used for writing references
  h5 {
    color: var(--heading-color);
    font-weight: normal;
    margin: 0;
  }

  // picture legend mostly
  h6 {
    color: var(--heading-color);
    font-weight: normal;
    margin: -18px 0 18px 0;
    text-align: center;
  }

  img {
    border-radius: 30px;
    display: block;
    margin: 0 auto;
    height: 300px;
    object-fit: cover;
    width: 100%;
  }

  a {
    text-decoration: underline;
    word-break: break-word;
  }

  blockquote {
    color: var(--heading-color);
    font-style: italic;
    margin: 0 0 32px;
    padding-left: 40px;
    position: relative;

    &:before {
      content: "“";
      font-size: 80px;
      left: -8px;
      position: absolute;
      top: w26px;
    }

    p {
      margin: 0;
    }
  }

  .md-header {
    position: relative;
  }

  .md-anchor {
    position: absolute;
    top: -44px;
  }

  strong {
    font-weight: bold;
  }
}
</style>
