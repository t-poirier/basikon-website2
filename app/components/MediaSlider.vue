<template>
  <div class="logo-container flex flex-col m-auto max-w-screen">
    <div class="logo-scroll flex overflow-hidden select-none">
      <template v-for="copy of [1, 2, 3]" :key="copy">
        <div class="logo-scroll-wrapper items-center flex shrink-[0] justify-around min-w-full">
          <img
            class="h-[50px] object-contain object-center mx-[--gap] brightness-[0.6]"
            v-for="(item, index) of items"
            :key="index"
            :src="prefixWithResourcesUrl(item.url)"
            :alt="item.url"
          />
        </div>
      </template>
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
.logo-container {
  --gap: 55px;
  --duration: 5s;
  --scroll-start: 0;
  --scroll-end: calc(-100% - var(--gap));
}

.logo-scroll {
  /* Adds a gradient mask to fade edges */
  mask-image: linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 30%, hsl(0 0% 0% / 1) 70%, hsl(0 0% 0% / 0));
}

.logo-scroll-wrapper {
  animation: scroll var(--duration) linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(var(--scroll-start));
  }
  to {
    transform: translateX(var(--scroll-end));
  }
}
</style>
