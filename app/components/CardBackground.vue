<template>
  <div
    v-if="(background?.url || background?.style) && ['image', undefined].includes(background?.type)"
    :class="'size-full bg-no-repeat bg-center bg-cover z-[1]' + (absolute ? ' absolute' : '')"
    :style="{
      ...{
        'background-color': background.style ? `var(--color-${background.style})` : undefined,
        'background-image': background.url ? `url(${resourcesUrl}${background.url})` : undefined,
        'background-position': background.position,
        'background-size': background.size,
      },
    }"
  ></div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
defineProps({
  absolute: Boolean,
  background: {
    type: Object,
    default: () => ({
      url: "",
      position: "",
      size: "",
    }),
  },
})
</script>
