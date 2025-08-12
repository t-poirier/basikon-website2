<template>
  <div class="overflow-x-hidden h-full flex items-center">
    <div class="wrapper flex">
      <div v-for="copy in 3" :key="copy" class="flex items-center">
        <img
          v-for="(item, index) in items"
          :key="`${copy}-${index}`"
          class="h-[50px] max-w-none object-contain object-center mx-[50px]"
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
  animation: scrollLogos 15s linear infinite;

  img {
    filter: brightness(0.6);
  }
}

/* With 3 copies, we start at 0% and move by 1/3 of total width (33.333%) */
@keyframes scrollLogos {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.3333%);
  }
}
</style>
