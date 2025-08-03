<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="max-w-5xl m-auto flex justify-between">
        <NuxtLink class="mr-5" :to="localePath('/')">Basikon</NuxtLink>

        <div class="flex">
          <div class="ml-5 mr-5">{{ $t("solutions") }}</div>
          <div class="ml-5 mr-5">{{ $t("customers") }}</div>
          <NuxtLink class="ml-5 mr-5" :to="localePath('/about')">{{ $t("aboutUs") }}</NuxtLink>
          <div class="ml-5 mr-5">{{ $t("resources") }}</div>
        </div>

        <select @change="switchLocale($event)" name="locales">
          <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code" :selected="locale.code === currentLocale">
            {{ locale.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
const { locales, locale: currentLocale, setLocale } = useI18n()

const availableLocales = locales.value

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>
