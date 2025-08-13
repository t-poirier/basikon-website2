<template>
  <div :class="'card-block flex flex-col relative' + (height ? ` min-h-${height}` : '')">
    <div v-if="Object.keys(background || {}).length" class="px-[2.5%] grow flex flex-col size-full">
      <CardBackground :background="background" />
    </div>

    <div
      v-if="suphead?.text"
      :class="
        'px-[2.5%] pointer-events-auto mt-2 max-w-[1200px] relative' +
        (align === 'side' ? '' : ' m-auto') +
        (suphead?.fontWeight === 'bold' ? ' font-bold' : '') +
        (suphead?.fontStyle === 'italic' ? ' italic' : '') +
        getTextStyle(suphead)
      "
    >
      <a v-if="suphead?.anchor" :id="suphead.anchor" :href="`#${suphead.anchor}`" class="absolute top-[-100px]" />
      <span v-html="parseText(suphead.text)"></span>
    </div>

    <component
      v-if="headline?.text"
      :is="isHeroTemplate ? 'h2' : 'h3'"
      :class="
        'px-[2.5%] pointer-events-auto mt-3 max-w-[1200px] relative' +
        (align === 'side' ? '' : ' m-auto') +
        (headline?.fontWeight === 'normal' ? '' : ' font-bold') +
        (headline?.fontStyle === 'italic' ? ' italic' : '') +
        (isHeroTemplate ? ' text-5xl leading-[3.2rem] sm:leading-[3.5rem] ' : ' text-4xl leading-[2.7rem] sm:leading-[3rem] ') +
        getTextStyle(headline)
      "
    >
      <a v-if="headline?.anchor" :id="headline.anchor" :href="`#${headline.anchor}`" class="absolute top-[-100px]" />
      <span v-html="parseText(headline?.text)"></span>
    </component>

    <div
      v-if="subhead?.text"
      :class="
        'px-[2.5%] mt-2 pointer-events-auto max-w-[1200px]' +
        (align === 'side' ? '' : ' m-auto') +
        (isHeroTemplate ? ' text-2xl' : ' text-xl') +
        (subhead?.fontWeight === 'bold' ? ' font-bold' : '') +
        (subhead?.fontStyle === 'italic' ? ' italic' : '') +
        getTextStyle(subhead)
      "
    >
      <a v-if="subhead?.anchor" :id="subhead.anchor" :href="`#${subhead.anchor}`" class="absolute top-[-100px]" />
      <span v-html="parseText(subhead.text)"></span>
    </div>

    <div
      v-if="summaryText"
      :class="'px-[2.5%] mt-2 pointer-events-auto max-w-[1200px]' + (align === 'side' ? '' : ' m-auto')"
      v-html="parseText(showFullSummary ? fullSummary : summaryText)"
    ></div>
    <div v-if="shouldCutSummary && !showFullSummary" class="px-[2.5%] text-blue pointer-events-auto cursor-pointer" @click.stop="toggleSummary">
      {{ $t("index.readMore") }}
    </div>

    <div v-if="buttons.length" :class="'mt-1 px-[2.5%] max-w-[1200px]' + (align === 'side' ? '' : ' m-auto')">
      <NuxtLink
        v-for="button in buttons"
        :key="button.text"
        :to="localePath(button.href)"
        :class="`mt-3 mr-4 pointer-events-auto button button-${button.color}`"
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
  align: String,
})

const isHeroTemplate = moduleTemplate === "heroes"
const localePath = useLocalePath()
const markedInstance = getMarkedInstance({ localePath, useHeadingAnchors: true })

const showFullSummary = ref(false)
const fullSummary = messages?.[summary?.text] || summary?.text || ""
const shouldCutSummary = summary?.maxLength < fullSummary?.length
const summaryText = shouldCutSummary ? fullSummary.substring(0, summary?.maxLength) + "..." : fullSummary

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
