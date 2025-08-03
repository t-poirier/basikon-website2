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
        <div class="split-wrapper-top">
          <h2 class="headline max-w-xs m-auto text-center">
            {{ topHeadline }}
          </h2>

          <p class="subhead max-w-xs m-auto text-center">
            {{ topSubhead }}
          </p>
        </div>
        <div class="split-wrapper-bottom">
          <h2 class="headline max-w-xs m-auto text-center">
            {{ bottomHeadline }}
          </h2>

          <p class="subhead max-w-xs m-auto text-center">
            {{ bottomSubhead }}
          </p>
        </div>
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
  textClass: {
    type: String,
    default: "",
  },
})

const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}`
</script>
