<template>
  <div :class="colClassName">
    <div :class="'mb-4 relative overflow-hidden ' + (cardHeight ? `h-${cardHeight}` : '')">
      <a v-if="cardLinkTo" :href="cardLinkTo" class="w-full h-full z-[3] left-[0] top-[0] absolute" tabindex="-1"></a>

      <div
        v-if="imgName"
        class="absolute w-full h-full bg-no-repeat bg-center bg-cover z-[1]"
        :style="{
          'background-image': `url(/img/${imgName})`,
        }"
      ></div>

      <div :class="'pt-[61px] pb-[61px] h-full flex flex-col justify-between relative pointer-events-none z-[4] ' + (textColor ? `text-${textColor}` : '')">
        <CardBlock
          :headline="topHeadline"
          :subhead="topSubhead"
          :moduleTemplate="moduleTemplate"
          :btns="topBtns"
          :subheadStyle="topSubheadStyle"
        />
        <CardBlock
          :headline="bottomHeadline"
          :subhead="bottomSubhead"
          :moduleTemplate="moduleTemplate"
          :btns="bottomBtns"
          :subheadStyle="bottomSubheadStyle"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  cardLinkTo: String,
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
  bottomHeadline: String,
  bottomSubhead: String,
  bottomSubheadStyle: String,
  bottomBtns: {
    type: Array,
    default: () => [],
  },
  topHeadline: String,
  topSubhead: String,
  topSubheadStyle: String,
  topBtns: {
    type: Array,
    default: () => [],
  },
  imgName: String,
  moduleTemplate: String,
  textColor: {
    type: String,
    default: "",
  },
})

const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}`
</script>
