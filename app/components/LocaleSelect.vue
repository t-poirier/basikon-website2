<template>
  <div class="flex items-center">
    <img src="@/assets/icons/earth-europe-light.svg" :class="'size-[24px]' + (responsive ? ' ml-2 hidden lg:block' : ' ml-4')" />
    <select @change="switchLocale($event)" name="locales" :class="'bg-white cursor-pointer' + (responsive ? ' hidden lg:block' : ' py-2 grow mr-5')">
      <option
        v-for="availableLocale in availableLocales"
        :key="availableLocale.code"
        :value="availableLocale.code"
        :selected="availableLocale.code === locale"
      >
        {{ availableLocale.name }}
      </option>
    </select>
  </div>
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
