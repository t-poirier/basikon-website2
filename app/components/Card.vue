<template>
  <Carousel v-if="hasCarousel" :items="items" />
  <CardInner v-else v-bind="items[0]" />
</template>

<script setup>
import { useAttrs } from "vue"
const attrs = useAttrs()

const { carousel } = defineProps({
  carousel: {
    type: Array,
    default: () => [],
  },
})

const hasCarousel = carousel.length
const items = hasCarousel ? carousel : [attrs]
</script>
