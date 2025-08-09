<template>
  <div :class="'card-block pl-4 pr-4' + (align === 'side' ? ' sm:pl-20 sm:pr-20' : '')" :data-module-template="moduleTemplate">
    <component :is="moduleTemplate === 'heroes' ? 'h2' : 'h3'" :class="headlineClass">
      <span :class="headline?.style === 'white' ? ` text-${headline.style}` : ''">
        <template v-for="(fragment, index) in headline?.text?.split('<br>')"><br v-if="index" />{{ fragment }} </template></span
      >
    </component>

    <p :class="'subhead pointer-events-auto' + (align === 'side' ? '' : ' text-center')">
      <span :class="subhead?.style === 'ai-gradient' ? subhead.style : subhead?.style === 'white' ? ` text-${headline.style}` : ''">
        <template v-for="(fragment, index) in subhead?.text?.split('<br>')"><br v-if="index" />{{ fragment }} </template></span
      >
    </p>

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

const headlineClass = "headline pointer-events-auto" + (align === "side" ? "" : " text-center")
</script>
