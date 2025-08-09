<template>
  <div
    v-if="(background?.url || background?.color) && ['image', undefined].includes(background?.type)"
    :class="'size-full bg-no-repeat bg-center bg-cover z-[1]' + (absolute ? ' absolute' : '')"
    :style="{
      ...{
        'background-color': background.color ? `var(--color-${background.color})` : undefined,
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
