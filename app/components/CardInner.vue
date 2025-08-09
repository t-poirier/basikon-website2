<template>
  <div :class="colClassName + (inArray ? '' : ' !p-0')">
    <div :class="'mb-4 relative overflow-hidden' + (height ? ` h-${height} min-h-${height}` : '')">
      <NuxtLink v-if="bgHref" :href="localePath(bgHref)" class="w-full h-full z-[3] left-[0] top-[0] absolute" tabindex="-1"></NuxtLink>

      <div
        v-if="bgImg?.url || bgCss"
        class="absolute w-full h-full bg-no-repeat bg-center bg-cover z-[1]"
        :style="{
          ...{
            // bg image can also be provided in bgCss
            background: bgCss,
            'background-image': bgImg?.url ? `url(${resourcesUrl}${bgImg.url})` : undefined,
            'background-position': bgImg?.position,
            'background-size': bgImg?.size,
          },
        }"
      ></div>
      <video v-else-if="bgVideo?.url" autoplay muted loop playsinline class="absolute w-full h-full z-[1]">
        <source :src="bgVideo.url" type="video/mp4" />
      </video>

      <ImgSlider v-if="imgSlider?.images?.length" :images="imgSlider.images" />

      <div
        v-if="blocks.top || blocks.middle || blocks.bottom"
        class="h-full flex flex-col justify-between relative pointer-events-none z-[4]"
      >
        <CardBlock v-bind="blocks.top" />
        <CardBlock v-bind="blocks.middle" />
        <CardBlock v-bind="blocks.bottom" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
const { lg, md, sm, xs, vh } = defineProps({
  inArray: Boolean,
  bgHref: String,
  bgCss: String,
  lg: String,
  md: String,
  sm: String,
  xs: {
    type: String,
    default: "12",
  },
  height: String,
  imgSlider: {
    type: Array,
    default: () => [],
  },
  blocks: {
    type: Object,
    default: () => ({
      bottom: undefined,
      middle: undefined,
      top: undefined,
    }),
  },
  bgImg: {
    type: Object,
    default: () => ({
      url: "",
      position: "",
      size: "",
    }),
  },
  bgVideo: {
    type: Object,
    default: () => ({
      url: "",
    }),
  },
})

const localePath = useLocalePath()
const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}`
</script>
