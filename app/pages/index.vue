<template>
  <div>
    <select @change="switchLocale($event)">
      <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
        {{ locale.name }}
      </option>
    </select>
    <h1>{{ $t("welcome") }}</h1>
  </div>
</template>

<script setup>
const { locales, locale, setLocale } = useI18n()

const availableLocales = locales.value

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>

<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
