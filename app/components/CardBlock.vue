<template>
  <div :class="'card-block' + (height ? ` min-h-${height}` : '')">
    <CardBackground :background="background" />

    <div v-if="suphead?.text" :class="'px-[2.5%] pointer-events-auto mt-2' + getTextStyle(suphead)" v-html="parseMarkdown(suphead?.text)"></div>

    <h2
      v-if="moduleTemplate === 'heroes'"
      :class="
        'px-[2.5%] text-5xl leading-[3.5rem] pointer-events-auto mt-3' + (headline?.weight === 'normal' ? '' : ' font-bold') + getTextStyle(headline)
      "
      v-html="parseMarkdown(headline?.text)"
    ></h2>
    <h3
      v-else
      :class="
        'px-[2.5%] text-4xl leading-[3rem] pointer-events-auto mt-3' + (headline?.weight === 'normal' ? '' : ' font-bold') + getTextStyle(headline)
      "
      v-html="parseMarkdown(headline?.text)"
    ></h3>

    <div
      v-if="subhead?.text"
      :class="'px-[2.5%] mt-1 pointer-events-auto' + (moduleTemplate === 'heroes' ? ' text-2xl' : ' text-xl') + getTextStyle(subhead)"
      v-html="parseMarkdown(subhead?.text)"
    ></div>

    <div v-if="buttons.length" class="mt-1 px-[2.5%]">
      <NuxtLink
        v-for="button in buttons"
        :key="button.text"
        :href="localePath(button.href)"
        :class="`mt-3 mx-2 first:ml-0 pointer-events-auto button button-${button.color}`"
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
  suphead: {
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

function getTextStyle({ color } = {}) {
  return color === "ai-gradient" ? ` ${color}` : color ? ` text-${color}` : ""
}

function parseMarkdown(text) {
  return markedInstance.parse(text.replaceAll("$v{resourcesUrl}", resourcesUrl))
}
</script>
