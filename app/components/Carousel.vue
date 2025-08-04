<template>
  <div class="relative w-full mx-auto overflow-hidden">
    <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(item, index) in items" :key="index" class="w-full flex-shrink-0">
        <CardInner v-bind="item" />
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow w-[30px] h-[30px] flex items-center justify-center"
    >
      ‹
    </button>
    <button
      @click="nextSlide"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full shadow w-[30px] h-[30px] flex items-center justify-center"
    >
      ›
    </button>

    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
      <button
        v-for="(slide, index) in items"
        :key="index"
        @click="goToSlide(index)"
        :class="['w-3 h-3 rounded-full', currentSlide === index ? 'bg-white' : 'bg-white/50']"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

const { items } = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

const currentSlide = ref(0)
let interval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % items.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + items.length) % items.length
}

const goToSlide = index => {
  currentSlide.value = index
}

onMounted(() => {
  interval = setInterval(nextSlide, 7000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>
