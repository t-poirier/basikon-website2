<template>
  <div :class="colClassName + (inArray ? '' : ' !p-0')">
    <div
      :class="
        'relative overflow-hidden flex justify-center' +
        (margin?.bottom === 0 ? '' : ' mb-4') +
        (maxWidth ? ` max-w-${maxWidth} m-auto` : '') +
        (height ? ` min-h-${height}` : '') +
        (blocks?.align === 'side' ? ' text-left' : ' text-center')
      "
    >
      <NuxtLink
        v-if="background?.href"
        :href="localePath(background.href)"
        :class="'size-full left-[0] top-[0] absolute' + (background?.hrefOverlay ? ' z-[10] ' : ' z-[3] ')"
      ></NuxtLink>

      <CardBackground absolute :background="background" />

      <MediaSlider v-if="blocks?.mediaSlider?.items?.length" :items="blocks?.mediaSlider.items" />
      <HubspotForm v-if="blocks?.hubspotForm" :hubspotForm="blocks.hubspotForm" />
      <Markdown v-if="blocks?.markdown" :markdown="blocks.markdown" />
      <CategoryContent v-if="blocks?.categoryContent" :content="blocks.categoryContent" />

      <div
        v-if="blocks.top || blocks.middle || blocks.bottom"
        class="py-[2.5%] grow w-full flex flex-col justify-between relative pointer-events-none z-[4]"
      >
        <!-- We need the 3 blocks to always be present in the DOM for the flex justify between effect to occur -->
        <!-- Inside the card block there can be nothing as long as the wrapper is there -->
        <CardBlock v-bind="blocks.top" />
        <CardBlock v-bind="blocks.middle" />
        <CardBlock v-bind="blocks.bottom" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  show: { type: Boolean, default: true },
  inArray: Boolean,
  lg: String,
  md: String,
  sm: String,
  xs: {
    type: String,
    default: "12",
  },
  maxWidth: String,
  height: String,
  margin: {
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
