<template>
  <video
    v-if="background?.url && background?.type === 'video'"
    :autoplay="background?.autoplay"
    :muted="background?.muted"
    :loop="background?.loop"
    playsinline
    class="absolute size-full z-[1]"
  >
    <source :src="encodeURI(background.url)" type="video/mp4" />
  </video>

  <iframe
    v-if="background?.url && background?.type === 'videoIframe'"
    class="absolute size-full z-[1]"
    :src="encodeURI(background.url)"
    title="Video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>

  <div
    v-if="(background?.url || background?.color) && ['image', undefined].includes(background?.type)"
    :class="
      'size-full bg-no-repeat bg-center bg-cover z-[1]' + (absolute ? ' absolute' : '') + (background?.borderRadius === '5px' ? ' rounded-[5px]' : '')
    "
    :style="{
      ...{
        'background-color': background.color ? `var(--color-${background.color})` : undefined,
        'background-image': background.url ? `url(${resourcesUrl + encodeURI(background.url)})` : undefined,
        'background-position': background.position,
        'background-size': background.size,
        filter: background.filter,
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
      borderRadius: "",
      filter: "",
    }),
  },
})
</script>
