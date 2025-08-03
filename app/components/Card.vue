<template>
  <div :class="className">
    <slot />
  </div>
</template>

<script setup>
const { lg, md, sm, xs } = defineProps({
  lg: Number,
  md: Number,
  sm: Number,
  xs: {
    type: Number,
    default: 12,
  },
})

const className = `card ${lg ? `col-lg-${lg} ` : ""}${md ? `col-md-${md} ` : ""}${sm ? `col-sm-${sm} ` : ""}col-xs-${xs}`
</script>
