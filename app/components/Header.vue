<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="max-w-5xl m-auto flex justify-between items-center h-[44px]">
        <NuxtLink
          class="mr-5 h-[22px] w-[200px] bg-no-repeat bg-center bg-contain"
          :style="{
            'background-image': `url(${resourcesUrl}/img/customers/basikon.svg)`,
          }"
          :to="localePath('/')"
        >
        </NuxtLink>

        <div class="hidden sm:flex">
          <div class="ml-5 mr-5">{{ $t("solutions") }}</div>
          <div class="ml-5 mr-5">{{ $t("customers") }}</div>
          <NuxtLink class="ml-5 mr-5" :to="localePath('/about')">{{ $t("aboutUs") }}</NuxtLink>
          <div class="ml-5 mr-5">{{ $t("resources") }}</div>
        </div>

        <div class="ml w-[200px]">
        <select @change="switchLocale($event)" name="locales">
          <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code" :selected="locale.code === currentLocale">
            {{ locale.name }}
          </option>
        </select></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
const localePath = useLocalePath()
const { locales, locale: currentLocale, setLocale } = useI18n()

const availableLocales = locales.value

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>
