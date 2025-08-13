<template>
  <div class="relative w-full mx-auto overflow-hidden">
    <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <template v-for="(card, index) in cards" :key="index">
        <div class="w-full flex-shrink-0">
          <div class="row">
            <div class="col-xs-12" v-if="Array.isArray(card.row)">
              <div :class="'row' + (card.flexColReverse?.xs ? ' flex-col-reverse sm:flex-row' : '')">
                <CardInner v-for="row in card.row" v-bind="row" :messages="messages" inArray />
              </div>
            </div>

            <CardInner v-else v-bind="card" :messages="messages" inArray />
          </div>
        </div>
      </template>
    </div>

    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
      <button
        v-for="(slide, index) in cards"
        :key="index"
        @click="goToSlide(index)"
        :class="['size-3 rounded-full', currentSlide === index ? ' bg-[--color-cyan]' : ' bg-white/50']"
      />
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue"

const { cards, nextSlideInterval } = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
  nextSlideInterval: {
    type: Number,
    default: 7000,
  },
  messages: Object,
})

const currentSlide = ref(0)
let interval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % cards.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + cards.length) % cards.length
}

const goToSlide = index => {
  currentSlide.value = index
}

onMounted(() => {
  interval = setInterval(nextSlide, nextSlideInterval)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>
