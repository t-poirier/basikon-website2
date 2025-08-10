<template>
  <div :class="'card-block relative' + (height ? ` min-h-${height}` : '')">
    <div v-if="Object.keys(background || {}).length" class="px-[2.5%] size-full">
      <CardBackground :background="background" />
    </div>

    <div
      v-if="suphead?.text"
      :class="
        'px-[2.5%] pointer-events-auto mt-2 max-w-[1200px] m-auto' +
        (suphead?.fontWeight === 'bold' ? ' font-bold' : '') +
        (suphead?.fontStyle === 'italic' ? ' italic' : '') +
        getTextStyle(suphead)
      "
      v-html="parseText(suphead?.text)"
    ></div>

    <component
      v-if="headline?.text"
      :is="isHeroTemplate ? 'h2' : 'h3'"
      :class="
        'px-[2.5%] pointer-events-auto mt-3 max-w-[1200px] m-auto' +
        (headline?.fontWeight === 'normal' ? '' : ' font-bold') +
        (headline?.fontStyle === 'italic' ? ' italic' : '') +
        (isHeroTemplate ? ' text-5xl leading-[3.5rem] ' : ' text-4xl leading-[3rem] ') +
        getTextStyle(headline)
      "
    >
      <span v-html="parseText(headline?.text)"></span>
    </component>

    <div
      v-if="subhead?.text"
      :class="
        'px-[2.5%] mt-2 pointer-events-auto max-w-[1200px] m-auto' +
        (isHeroTemplate ? ' text-2xl' : ' text-xl') +
        (subhead?.fontWeight === 'bold' ? ' font-bold' : '') +
        (subhead?.fontStyle === 'italic' ? ' italic' : '') +
        getTextStyle(subhead)
      "
      v-html="parseText(subhead?.text)"
    ></div>

    <div
      v-if="summaryText"
      :class="'px-[2.5%] mt-2 pointer-events-auto max-w-[1200px] m-auto'"
      v-html="parseText(showFullSummary ? summary.text : summaryText)"
    ></div>
    <div v-if="shouldCutSummary && !showFullSummary" class="px-[2.5%] text-blue pointer-events-auto cursor-pointer" @click.stop="toggleSummary">
      {{ $t("Read more") }}
    </div>

    <div v-if="buttons.length" class="mt-1 px-[2.5%] max-w-[1200px] m-auto">
      <NuxtLink
        v-for="button in buttons"
        :key="button.text"
        :href="localePath(button.href)"
        :class="`mt-3 mx-2 first:ml-0 pointer-events-auto button button-${button.color}`"
      >
        {{ messages?.[button.text] || button.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { getMarkedInstance, resourcesUrl } from "@/services/utils"
import { ref } from "vue"

const { lg, md, sm, xs, vh, moduleTemplate, summary, messages } = defineProps({
  height: String,
  background: Object,
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
  summary: {
    type: Object,
    default: () => ({
      text: "",
      style: "",
      maxLength: undefined,
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
  messages: Object,
})

const isHeroTemplate = moduleTemplate === "heroes"
const localePath = useLocalePath()
const markedInstance = getMarkedInstance({ localePath, useHeadingAnchors: true })

const showFullSummary = ref(false)
const shouldCutSummary = summary?.maxLength < summary?.text?.length
const summaryText = shouldCutSummary ? summary?.text.substring(0, summary.maxLength) + "..." : summary?.text

function getTextStyle({ color } = {}) {
  return color === "ai-gradient" ? ` ${color}` : color ? ` text-${color}` : ""
}

function parseText(text) {
  return markedInstance.parse((messages?.[text] || text).replaceAll("$v{resourcesUrl}", resourcesUrl))
}

function toggleSummary() {
  showFullSummary.value = !showFullSummary.value
}
</script>
