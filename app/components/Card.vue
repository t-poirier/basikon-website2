<template>
  <div :class="colClassName">
    <div :class="'card mt-2 mb-2 relative overflow-hidden ' + cardClass">
      <div
        v-if="imgName"
        class="absolute w-full h-full bg-no-repeat bg-center z-[-1]"
        :style="{
          'background-image': `url(/img/${imgName})`,
        }"
      ></div>

      <slot />
    </div>
  </div>
</template>

<script setup>
const { lg, md, sm, xs, vh } = defineProps({
  lg: Number,
  md: Number,
  sm: Number,
  xs: {
    type: Number,
    default: 12,
  },
  cardClass: {
    type: String,
    default: "",
  },
  imgName: String,
})

const colClassName = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}`
</script>
