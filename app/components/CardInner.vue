<template>
  <div :class="colClassName + (margin?.lateral === 0 || ! inArray? ' !p-0' : '')">
    <div
      :class="
        'relative overflow-hidden flex flex-col items-center justify-center grow' +
        (margin?.bottom === 0 ? '' : ' mb-4') +
        (maxWidth ? ` max-w-${maxWidth} m-auto` : '') +
        (height ? ` min-h-${height}` : '') +
        (align === 'side' ? ' text-left' : ' text-center')
      "
    >
      <NuxtLink
        v-if="background?.href"
        :target="background?.hrefTarget"
        :href="localePath(background.href)"
        :class="'size-full left-[0] top-[0] absolute' + (background?.hrefOverlay ? ' z-[10] ' : ' z-[3] ')"
      ></NuxtLink>

      <CardBackground absolute :background="background" />

      <div
        v-if="blocks.top || blocks.middle || blocks.bottom"
        class="py-[2.5%] grow w-full flex flex-col justify-between relative pointer-events-none z-[4]"
      >
        <!-- We need the 3 blocks to always be present in the DOM for the flex justify between effect to occur -->
        <!-- Inside the card block there can be nothing as long as the wrapper is there -->
        <CardBlock v-bind="blocks.top" :messages="messages" :align="align" />
        <CardBlock v-bind="blocks.middle" :messages="messages" :align="align" />
        <CardBlock v-bind="blocks.bottom" :messages="messages" :align="align" />
      </div>

      <MediaSlider v-if="mediaSlider?.items?.length" :items="mediaSlider.items" />
      <HubspotForm v-if="hubspotForm" :hubspotForm="hubspotForm" :messages="messages" />
      <Markdown v-if="markdown" :markdown="markdown" :messages="messages" />
      <CategoryList v-if="categoryList" :content="categoryList" :messages="messages" />
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  show: { type: Boolean, default: true },
  inArray: Boolean,
  lg: Number,
  md: Number,
  sm: Number,
  xs: {
    type: Number,
    default: 12,
  },
  maxWidth: String,
  height: String,
  margin: {
    type: Object,
    default: () => ({
      bottom: undefined,
    }),
  },
  hubspotForm: Object,
  mediaSlider: Object,
  markdown: Object,
  messages: Object,
  categoryList: Object,
  align: String,
  blocks: {
    type: Object,
    default: () => ({
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
const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs} flex `
</script>
