<template>
  <div class="header col-xs-12">
    <span>Basikon</span>

    <select @change="switchLocale($event)" name="locales">
      <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code" :selected="locale.code === currentLocale">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const { locales, locale: currentLocale, setLocale } = useI18n()

const availableLocales = locales.value

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>
