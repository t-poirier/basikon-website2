<template>
  <div :class="'card-block' + (height ? ` min-h-${height}` : '')">
    <CardBackground :background="background" />

    <div
      v-if="suphead?.text"
      :class="
        'px-[2.5%] pointer-events-auto mt-2 max-w-[1200px] m-auto' +
        (suphead?.fontWeight === 'normal' ? '' : ' font-bold') +
        (suphead?.fontStyle === 'italic' ? ' italic' : '') +
        getTextStyle(suphead)
      "
      v-html="parseMarkdown(suphead?.text)"
    ></div>

    <component
      :is="isHeroTemplate ? 'h2' : 'h3'"
      :class="
        'px-[2.5%] pointer-events-auto mt-3 max-w-[1200px] m-auto' +
        (headline?.fontWeight === 'normal' ? '' : ' font-bold') +
        (headline?.fontStyle === 'italic' ? ' italic' : '') +
        (isHeroTemplate ? ' text-5xl leading-[3.5rem] ' : ' text-4xl leading-[3rem] ') +
        getTextStyle(headline)
      "
    >
      <span v-html="parseMarkdown(headline?.text)"></span>
    </component>

    <div
      v-if="subhead?.text"
      :class="
        'px-[2.5%] mt-1 pointer-events-auto max-w-[1200px] m-auto' +
        (isHeroTemplate ? ' text-2xl' : ' text-xl') +
        (subhead?.fontWeight === 'bold' ? ' font-bold' : '') +
        (subhead?.fontStyle === 'italic' ? ' italic' : '') +
        getTextStyle(subhead)
      "
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
import { getMarkedInstance, resourcesUrl } from "@/services/utils"

const { lg, md, sm, xs, vh, moduleTemplate } = defineProps({
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

const isHeroTemplate = moduleTemplate === "heroes"
const localePath = useLocalePath()
const markedInstance = getMarkedInstance({ localePath, useHeadingAnchors: true })

function getTextStyle({ color } = {}) {
  return color === "ai-gradient" ? ` ${color}` : color ? ` text-${color}` : ""
}

function parseMarkdown(text) {
  return markedInstance.parse(text.replaceAll("$v{resourcesUrl}", resourcesUrl))
}
</script>
