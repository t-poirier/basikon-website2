<template>
  <div :class="'card-block pl-4 pr-4' + (align === 'side' ? ' sm:pl-10 sm:pr-10' : '')" :data-module-template="moduleTemplate">
    <h2 v-if="moduleTemplate === 'heroes'" :class="headlineClass + getTextStyle(headline)" v-html="parseMarkdown(headline?.text)"></h2>
    <h3 v-else :class="headlineClass + getTextStyle(headline)" v-html="parseMarkdown(headline?.text)"></h3>

    <div
      :class="'subhead pointer-events-auto' + (align === 'side' ? '' : ' text-center') + getTextStyle(subhead)"
      v-html="parseMarkdown(subhead?.text)"
    ></div>

    <div v-if="buttons.length" :class="'flex items-center mt-5' + (align === 'side' ? '' : ' justify-center')">
      <NuxtLink
        v-for="button in buttons"
        :key="button.text"
        :href="button.href"
        :class="`ml-4 first:ml-0 pointer-events-auto button button-${button.style}`"
      >
        {{ button.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { align, lg, md, sm, xs, vh } = defineProps({
  align: String,
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
const headlineClass = "headline pointer-events-auto" + (align === "side" ? "" : " text-center")

function getTextStyle({ style } = {}) {
  return style === "ai-gradient" ? ` ${style}` : style ? ` text-${style}` : ""
}

function parseMarkdown(text) {
  return markedInstance.parse(text.replaceAll("$v{resourcesUrl}", resourcesUrl))
}
</script>
