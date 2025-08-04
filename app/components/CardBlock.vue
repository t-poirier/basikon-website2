<template>
  <div class="split-wrapper" :data-module-template="moduleTemplate">
    <h2 v-if="moduleTemplate === 'heroes'" :class="headlineClass">
      {{ headline }}
    </h2>
    <h3 v-if="moduleTemplate === 'promo'" :class="headlineClass">
      {{ headline }}
    </h3>

    <p class="subhead max-w-xs m-auto text-center">
      {{ subhead }}
    </p>

    <div v-if="btns.length" class="flex items-center justify-center mt-5">
      <a v-for="btn in btns" :key="btn.text" :href="btn.href" :class="`mr-2 ml-2 button button-${btn.theme}`">
        {{ btn.text }}
      </a>
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  headline: String,
  subhead: String,
  moduleTemplate: {
    type: String,
    default: "heroes",
  },
  btns: {
    type: Array,
    default: () => [],
  },
})

const headlineClass = "headline max-w-xs m-auto text-center"
</script>
