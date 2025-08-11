<template>
  <div class="overflow-x-hidden h-full flex items-center">
    <div class="wrapper flex relative w-fit">
      <!--  We want multiple copies of these images for a seamless transition.  -->
      <div v-for="copy of [1, 2, 3]" :key="copy" class="flex items-center">
        <img
          class="h-[50px] max-w-none object-contain object-center mx-[50px]"
          v-for="(item, index) of items"
          :key="index"
          :src="prefixWithResourcesUrl(item.url)"
          :alt="item.url"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { prefixWithResourcesUrl } from "@/services/utils"

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped lang="scss">
.wrapper {
  animation: scrollLogos 35s linear infinite;

  img {
    filter: brightness(0.6);
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
