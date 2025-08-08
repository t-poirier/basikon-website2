<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="max-w-[2560px] m-auto flex justify-between items-center h-[44px]">
        <NuxtLink
          class="h-[22px] w-[270px] bg-no-repeat bg-center bg-contain"
          :style="{
            'background-image': `url(${resourcesUrl}/img/customers/basikon.svg)`,
          }"
          :to="localePath('/')"
        >
        </NuxtLink>

        <div class="hidden sm:flex">
          <div v-for="menu in page.menus" class="ml-5 mr-5" :key="`${locale}-${menu.title}`">
            <NuxtLink v-if="menu.href" :href="localePath(menu.href)">{{ menu.title }}</NuxtLink>
            <div v-else>{{ menu.title }}</div>
          </div>
        </div>

        <div class="w-[270px] flex justify-end">
          <NuxtLink href="/demo-request" class="mr-2 ml-2 pointer-events-auto button button-sm">
            {{ $t("requestDemo") }}
          </NuxtLink>

          <select @change="switchLocale($event)" name="locales" class="mr-2 ml-2">
            <option
              v-for="availableLocale in availableLocales"
              :key="availableLocale.code"
              :value="availableLocale.code"
              :selected="availableLocale.code === locale"
            >
              {{ availableLocale.code.toUpperCase() }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { resourcesUrl } from "@/services/utils"
const localePath = useLocalePath()
const { locales, locale, setLocale } = useI18n()

const availableLocales = locales.value

const pageName = "header"
const { data: page, refresh } = await useAsyncData(`${pageName}-${locale.value}`, () =>
  $fetch(`${resourcesUrl}/pages/${locale.value}/${pageName}.json`),
)
watch(locale, () => refresh())

function switchLocale(event) {
  setLocale(event.target.value)
}
</script>
