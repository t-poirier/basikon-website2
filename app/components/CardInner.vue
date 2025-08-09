<template>
  <div :class="colClassName + (inArray ? '' : ' !p-0')">
    <div :class="'mb-4 relative overflow-hidden' + (cardHeight ? ` h-${cardHeight} min-h-${cardHeight}` : '')">
      <NuxtLink v-if="bgHref" :href="localePath(bgHref)" class="w-full h-full z-[3] left-[0] top-[0] absolute" tabindex="-1"></NuxtLink>

      <div
        v-if="imgUrl || bgCss"
        class="absolute w-full h-full bg-no-repeat bg-center bg-cover z-[1]"
        :style="{
          ...{
            background: bgCss,
            'background-image': imgUrl ? `url(${resourcesUrl}${imgUrl})` : undefined,
          },
        }"
      ></div>
      <video v-else-if="videoUrl" autoplay muted loop playsinline class="absolute w-full h-full z-[1]">
        <source :src="videoUrl" type="video/mp4" />
      </video>

      <ImgSlider v-if="imgSlider?.images?.length" :images="imgSlider.images" />

      <div
        v-if="blocks.top || blocks.middle || blocks.bottom"
        class="pt-[30px] pb-[30px] lg:pt-[60px] lg:pb-[60px] h-full flex flex-col justify-between relative pointer-events-none z-[4]"
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
  cardHeight: String,
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
  imgUrl: String,
  videoUrl: String,
})

const localePath = useLocalePath()
const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}`
</script>
