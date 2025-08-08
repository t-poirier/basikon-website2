<template>
  <div :class="'card-block pl-4 pr-4' + (textColor ? ` text-${textColor}` : '') + (align === 'side' ? ' sm:pl-20 sm:pr-20' : '')" :data-module-template="moduleTemplate">
    <h2 v-if="moduleTemplate === 'heroes'" :class="headlineClass">
      {{ headline }}
    </h2>
    <h3 v-if="moduleTemplate === 'promo'" :class="headlineClass">
      {{ headline }}
    </h3>

    <p :class="'subhead pointer-events-auto' + (align === 'side' ? '' : ' text-center')">
      <span :class="subheadStyle === 'ai-gradient' ? subheadStyle : ''">
        <template v-for="(fragment, index) in subhead?.split('<br>')"><br v-if="index" />{{ fragment }} </template></span
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
  headline: String,
  subhead: String,
  subheadStyle: String,
  textColor: String,
  moduleTemplate: {
    type: String,
    default: "heroes",
  },
  buttons: {
    type: Array,
    default: () => [],
  },
})

const headlineClass = "headline pointer-events-auto"+ (align === 'side' ? '' : ' text-center')
</script>
