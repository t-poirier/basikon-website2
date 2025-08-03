<template>
  <div :class="className">
    <div class="card mt-2 mb-2">
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
  vh: Number,
})

const className = (lg ? `col-lg-${lg}` : "") + (md ? ` col-md-${md}` : "") + (sm ? ` col-sm-${sm}` : "") + ` col-xs-${xs}` + (vh ? ` vh-${vh}` : "")
</script>
