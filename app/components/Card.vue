<template>
  <Carousel v-if="hasCarousel" v-bind="carousel" />
  <CardInner v-else v-bind="[attrs][0]" />
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

const hasCarousel = carousel.cards?.length
</script>
