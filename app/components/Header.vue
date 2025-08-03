<template>
  <div class="col-xs-12">
    <div class="header flex justify-between">
      <div>Basikon</div>

      <div class="flex">
        <div>{{ $t("solutions") }}</div>
        <div>{{ $t("customers") }}</div>
        <div>{{ $t("aboutUs") }}</div>
        <div>{{ $t("resources") }}</div>
      </div>

      <select @change="switchLocale($event)" name="locales">
        <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code" :selected="locale.code === currentLocale">
          {{ locale.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
const { locales, locale: currentLocale, setLocale } = useI18n()

const availableLocales = locales.value

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>
