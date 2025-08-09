<template>
  <div :class="colClassName + (inArray ? '' : ' !p-0')">
    <div
      :class="
        'mb-4 relative overflow-hidden flex items-center' +
        (height ? ` h-${height} min-h-${height}` : '') +
        (blocks?.align === 'side' ? '' : ' justify-center text-center')
      "
    >
      <NuxtLink
        v-if="background?.href"
        :href="localePath(background.href)"
        class="w-full h-full z-[3] left-[0] top-[0] absolute"
        tabindex="-1"
      ></NuxtLink>

      <video v-if="background?.url && background?.type === 'video'" autoplay muted loop playsinline class="absolute w-full h-full z-[1]">
        <source :src="background.url" type="video/mp4" />
      </video>
      <div
        v-else-if="(background?.url || background?.color) && ['image', undefined].includes(background?.type)"
        class="absolute w-full h-full bg-no-repeat bg-center bg-cover z-[1]"
        :style="{
          ...{
            'background-color': background.color,
            'background-image': background.url ? `url(${resourcesUrl}${background.url})` : undefined,
            'background-position': background.position,
            'background-size': background.size,
          },
        }"
      ></div>

      <MediaSlider v-if="mediaSlider?.items?.length" :items="mediaSlider.items" />

      <div v-if="blocks.top || blocks.middle || blocks.bottom" class="h-[85%] flex flex-col justify-between relative pointer-events-none z-[4]">
        <CardBlock v-bind="blocks.top" :align="blocks?.align" />
        <CardBlock v-bind="blocks.middle" :align="blocks?.align" />
        <CardBlock v-bind="blocks.bottom" :align="blocks?.align" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
const { lg, md, sm, xs, vh } = defineProps({
  inArray: Boolean,
  lg: String,
  md: String,
  sm: String,
  xs: {
    type: String,
    default: "12",
  },
  height: String,
  mediaSlider: {
    type: Array,
    default: () => [],
  },
  blocks: {
    type: Object,
    default: () => ({
      align: undefined,
      bottom: undefined,
      middle: undefined,
      top: undefined,
    }),
  },
  background: {
    type: Object,
    default: () => ({
      url: "",
      position: "",
      size: "",
    }),
  },
})

const localePath = useLocalePath()
const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}`
</script>
