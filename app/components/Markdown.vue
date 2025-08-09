<template>
  <div class="markdown" v-if="htmlContent" v-html="htmlContent">
  </div>
</template>

<script setup>
import { getMarkedInstance, resourcesUrl } from "@/services/utils"

const { text } = defineProps({
  text: String,
})
const localePath = useLocalePath()
const markedInstance = getMarkedInstance({ localePath, useHeadingAnchors: true  })

const htmlContent = markedInstance.parse(text.replaceAll("$v{resourcesUrl}", resourcesUrl))
</script>

<style scoped lang="scss">
.markdown :deep() {
  --heading-color: #072b6a;
  --text-color: #464646;

  max-width: 940px;

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

  ul,
  li {
    color: var(--text-color);
    font-weight: 300;
  }

  h1 {
    color: var(--heading-color);
    font-size: 44px;
    padding: 32px 0 16px;
  }

  h2 {
    color: var(--heading-color);
    margin-bottom: -10px;
    margin: 0;
    padding: 32px 0 16px;
    font-size: 32px;
  }

  h3 {
    color: var(--heading-color);
    font-size: 24px;
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
      top: -26px;
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
