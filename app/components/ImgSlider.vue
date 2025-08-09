<template>
  <div class="img-slider h-full flex items-center">
    <div class="wrapper">
      <div
        v-for="copy of [1, 2, 3] /* We want multiple copies of these images for a seamless transition. */"
        :key="copy"
        class="flex items-center"
      >
        <img
          v-for="(url, index) of images"
          :key="index"
          :src="`${resourcesUrl}${url}`"
          :alt="url"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import { resourcesUrl } from "@/services/utils"

defineProps({
  images: {
    type: Array,
    default: () => []
  },
})
</script>

<style scoped lang="scss">
.img-slider {
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
