<template>
  <div :class="'card-block' + (height ? ` min-h-${height}` : '')" :data-module-template="moduleTemplate">
    <CardBackground :background="background" />

    <h2 v-if="moduleTemplate === 'heroes'" :class="headlineClass + getTextStyle(headline)" v-html="parseMarkdown(headline?.text)"></h2>
    <h3 v-else :class="headlineClass + getTextStyle(headline)" v-html="parseMarkdown(headline?.text)"></h3>

    <div :class="'subhead px-[2.5%] pointer-events-auto' + getTextStyle(subhead)" v-html="parseMarkdown(subhead?.text)"></div>

    <div v-if="buttons.length" class="mt-2 px-[2.5%]">
      <NuxtLink
        v-for="button in buttons"
        :key="button.text"
        :href="localePath(button.href)"
        :class="`mt-3 mx-2 first:ml-0 pointer-events-auto button button-${button.style}`"
      >
        {{ button.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  height: String,
  background: {
    type: Object,
    default: () => ({
      url: "",
      position: "",
      size: "",
    }),
  },
  headline: {
    type: Object,
    default: () => ({
      text: "",
      style: "",
    }),
  },
  subhead: {
    type: Object,
    default: () => ({
      text: "",
      style: "",
    }),
  },
  moduleTemplate: {
    type: String,
    default: "heroes",
  },
  buttons: {
    type: Array,
    default: () => [],
  },
})

import { getMarkedInstance, resourcesUrl } from "@/services/utils"

const localePath = useLocalePath()
const markedInstance = getMarkedInstance({ localePath, useHeadingAnchors: true })
const headlineClass = "headline px-[2.5%] pointer-events-auto"

function getTextStyle({ style } = {}) {
  return style === "ai-gradient" ? ` ${style}` : style ? ` text-${style}` : ""
}

function parseMarkdown(text) {
  return markedInstance.parse(text.replaceAll("$v{resourcesUrl}", resourcesUrl))
}
</script>
