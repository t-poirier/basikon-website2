<template>
  <div class="medias-slider h-full flex items-center">
    <div class="wrapper">
      <!--  We want multiple copies of these images for a seamless transition.  -->
      <div v-for="copy of [1, 2, 3]" :key="copy" class="flex items-center">
        <img v-for="(item, index) of items" :key="index" :src="`${resourcesUrl}${item.url}`" :alt="item.url" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped lang="scss">
.medias-slider {
  overflow-x: hidden;
}

.wrapper {
  animation: scrollLogos 35s linear infinite;
  display: flex;
  position: relative;
  width: fit-content;

  img {
    filter: brightness(0.6);
    height: 50px;
    margin: 0 55px;
    max-width: unset;
    object-fit: contain;
    object-position: center;
  }
}

// Assumes 3 copies of the logos list.
@keyframes scrollLogos {
  0% {
    transform: translateX(-33.333333%);
  }

  100% {
    transform: translateX(-66.666666%);
  }
}
</style>
