<template>
  <div :class="colClassName">
    <div :class="'mt-2 mb-2 relative overflow-hidden ' + cardClass">
      <div
        v-if="imgName"
        class="absolute w-full h-full bg-no-repeat bg-center z-[-1]"
        :style="{
          'background-image': `url(/img/${imgName})`,
        }"
      ></div>

      <div :class="'pt-[61px] pb-[61px] h-full flex flex-col justify-between ' + textClass">
        <CardBlock :headline="topHeadline" :subhead="topSubhead" :moduleTemplate="moduleTemplate" />
        <CardBlock :headline="bottomHeadline" :subhead="bottomSubhead" :moduleTemplate="moduleTemplate" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  lg: String,
  md: String,
  sm: String,
  xs: {
    type: String,
    default: 12,
  },
  cardClass: {
    type: String,
    default: "",
  },
  bottomHeadline: String,
  bottomSubhead: String,
  topHeadline: String,
  topSubhead: String,
  imgName: String,
  moduleTemplate: String,
  textClass: {
    type: String,
    default: "",
  },
})

const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}`
</script>
