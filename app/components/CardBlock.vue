<template>
  <div class="split-wrapper" :data-module-template="moduleTemplate">
    <h2 v-if="moduleTemplate === 'heroes'" :class="headlineClass">
      {{ headline }}
    </h2>
    <h3 v-if="moduleTemplate === 'promo'" :class="headlineClass">
      {{ headline }}
    </h3>

    <p class="subhead text-center pointer-events-auto">
      <span :class="subheadStyle === 'ai-gradient' ? subheadStyle : ''">
        <template v-for="(fragment, index) in subhead?.split('<br>')"><br v-if="index" />{{ fragment }} </template></span
      >
    </p>

    <div v-if="btns.length" class="flex items-center justify-center mt-5">
      <NuxtLink v-for="btn in btns" :key="btn.text" :href="btn.href" :class="`mr-2 ml-2 pointer-events-auto button button-${btn.theme}`">
        {{ btn.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  headline: String,
  subhead: String,
  subheadStyle: {
    type: String,
    default: "",
  },
  moduleTemplate: {
    type: String,
    default: "heroes",
  },
  btns: {
    type: Array,
    default: () => [],
  },
})

const headlineClass = "headline text-center pointer-events-auto"
</script>
