<template>
  <select @change="switchLocale($event)" name="locales">
    <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code" :selected="locale.code === currentLocale">
      {{ locale.name }}
    </option>
  </select>

  <div class="row">
    <div class="col-sm-6 col-xs-12">A</div>
    <div class="col-sm-6 col-xs-12">B</div>
  </div>
  <div class="header">HEADER</div>

  <slot />

  <div class="footer">FOOTER</div>
</template>

<script setup>
const { locales, locale: currentLocale, setLocale } = useI18n()

const availableLocales = locales.value

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>

<style scoped>
.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 2rem;
}
</style>
