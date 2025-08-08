<template>
  <div :class="colClassName">
    <div :class="'mb-4 relative overflow-hidden ' + (cardHeight ? `h-${cardHeight}` : '')">
      <NuxtLink v-if="bgHref" :href="localePath(bgHref)" class="w-full h-full z-[3] left-[0] top-[0] absolute" tabindex="-1"></NuxtLink>

      <div
        v-if="imgUrl"
        class="absolute w-full h-full bg-no-repeat bg-center bg-cover z-[1]"
        :style="{
          'background-image': `url(${imgUrl})`,
        }"
      ></div>
      <video v-else-if="videoUrl" autoplay muted loop playsinline class="absolute w-full h-full z-[1]">
        <source :src="videoUrl" type="video/mp4" />
      </video>

      <div class="pt-[61px] pb-[61px] h-full flex flex-col justify-between relative pointer-events-none z-[4]">
        <CardBlock v-bind="blocks.top" />
        <CardBlock v-bind="blocks.middle" />
        <CardBlock v-bind="blocks.bottom" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  bgHref: String,
  lg: String,
  md: String,
  sm: String,
  xs: {
    type: String,
    default: "12",
  },
  cardHeight: {
    type: String,
    default: "",
  },
  blocks: {
    type: Object,
    default: () => ({
      bottom: {},
      middle: {},
      top: {},
    }),
  },
  imgUrl: String,
  videoUrl: String,
})

const localePath = useLocalePath()
const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}`
</script>
