<template>
  <select @change="switchLocale($event)" name="locales" :class="'bg-white cursor-pointer' + (responsive ? ' ml-2 hidden lg:block' : ' py-2 mx-5')">
    <option
      v-for="availableLocale in availableLocales"
      :key="availableLocale.code"
      :value="availableLocale.code"
      :selected="availableLocale.code === locale"
    >
      {{ availableLocale.code.toUpperCase() }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  responsive: Boolean,
})

const { locales, locale, setLocale } = useI18n()

const availableLocales = locales.value

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>
