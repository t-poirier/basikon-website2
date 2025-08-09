<template>
  <div class="markdown">
    <div v-if="htmlContent" v-html="htmlContent"></div>
  </div>
</template>

<script setup>
import { getMarkedInstance, resourcesUrl } from "@/services/utils"

const { markdown } = defineProps({
  markdown: String,
})
const localePath = useLocalePath()
const markedInstance = getMarkedInstance({ localePath, useHeadingAnchors: true  })

const htmlContent = markedInstance.parse(markdown.replaceAll("$v{resourcesUrl}", resourcesUrl))
</script>

<style scoped lang="scss">
.markdown :deep() {
  hr {
    border-color: var(--color-blue-darker);
    margin-left: 0;
    max-width: 70%;
  }

  p {
    color: var(--color-gray-darker);
    font-weight: 300;
    margin-top: 0;
    margin-bottom: 32px;
  }

  ul,
  li {
    color: var(--color-gray-darker);
    font-weight: 300;
  }

  h1 {
    color: var(--color-blue-darker);
    font-size: 44px;
    padding: 32px 0 16px;
  }

  h2 {
    color: var(--color-blue-darker);
    margin-bottom: -10px;
    margin: 0;
    padding: 32px 0 16px;
    font-size: 32px;
  }

  h3 {
    color: var(--color-blue-darker);
    font-size: 24px;
    margin: 24px 0 12px;
  }

  h4 {
    color: var(--color-blue-darker);
    margin: 24px 0 12px;
  }

  // this heading level is used for writing references
  h5 {
    color: var(--color-blue-darker);
    font-weight: normal;
    margin: 0;
  }

  // picture legend mostly
  h6 {
    color: var(--color-blue-darker);
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
    color: var(--color-gray-darker);
    word-break: break-word;
  }

  blockquote {
    color: var(--color-blue-darker);
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
    top: calc(-1 * var(--navbar-height));
  }

  strong {
    font-weight: bold;
  }
}

.markdown[data-theme="default"] :deep() {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
  }

  h2.md-header:not(:first-child) {
    position: relative;

    &::before {
      content: "";
      border-top: 1px solid var(--color-blue-darker);
      display: block;
      height: 1px;
      position: absolute;
      top: 8px;
      width: 70%;
    }
  }
}

.markdown[data-theme="alt1"] :deep() {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-blue);
  }

  hr {
    border-color: var(--color-blue);
  }
}
</style>
