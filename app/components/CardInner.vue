<template>
  <div :class="colClassName + (inArray ? '' : ' !p-0')">
    <div
      :class="
        'relative overflow-hidden flex justify-center' +
        (margins?.bottom === 0 ? '' : ' mb-4') +
        (height ? ` min-h-${height}` : '') +
        (blocks?.align === 'side' ? '' : ' text-center')
      "
    >
      <NuxtLink
        v-if="background?.href"
        :href="localePath(background.href)"
        class="size-full z-[3] left-[0] top-[0] absolute"
        tabindex="-1"
      ></NuxtLink>

      <video v-if="background?.url && background?.type === 'video'" autoplay muted loop playsinline class="absolute size-full z-[1]">
        <source :src="background.url" type="video/mp4" />
      </video>
      <div
        v-else-if="(background?.url || background?.style) && ['image', undefined].includes(background?.type)"
        class="absolute size-full bg-no-repeat bg-center bg-cover z-[1]"
        :style="{
          ...{
            'background-color': background.style ? `var(--color-${background.style})` : undefined,
            'background-image': background.url ? `url(${resourcesUrl}${background.url})` : undefined,
            'background-position': background.position,
            'background-size': background.size,
          },
        }"
      ></div>

      <MediaSlider v-if="blocks?.mediaSlider?.items?.length" :items="blocks?.mediaSlider.items" />
      <HubspotForm v-if="blocks?.hubspotForm" :hubspotForm="blocks.hubspotForm" />

      <div
        v-if="blocks.top || blocks.middle || blocks.bottom"
        class="p-[2.5%] grow w-full flex flex-col justify-between relative pointer-events-none z-[4]"
      >
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
  margins: {
    type: Object,
    default: () => ({
      bottom: undefined,
    }),
  },
  blocks: {
    type: Object,
    default: () => ({
      align: undefined,
      bottom: undefined,
      middle: undefined,
      top: undefined,
      mediaSlider: undefined,
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
