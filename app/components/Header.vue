<template>
  <div class="grid-container fixed bg-white z-[10]">
    <div class="row w-full">
      <div class="col-xs-12 !p-0">
        <div class="max-w-[2560px] m-auto flex justify-between items-center h-[44px]">
          <NuxtLink
            class="h-full w-[260px] bg-no-repeat bg-center bg-contain"
            :style="{
              'background-image': `url(/img/basikon.svg)`,
            }"
            :to="localePath('/')"
          >
          </NuxtLink>

          <div class="hidden h-full lg:flex items-center">
            <div v-for="menu in page.menus" class="h-full flex items-center" :key="`${locale}-${menu.title}`">
              <NuxtLink v-if="menu.href" :href="localePath(menu.href)" class="text-center block pl-5 pr-5">{{ menu.title }}</NuxtLink>

              <div v-else class="header-menu-block pl-5 pr-5 relative h-full flex items-center">
                <div class="text-center cursor-pointer">{{ menu.title }}</div>

                <div v-if="menu.items" class="absolute z-[1] top-[44px] pt-[10px]">
                  <div class="header-menu-items justify-between bg-white shadow-xs rounded-md">
                    <div v-for="item in menu.items" class="p-4">
                      <div class="font-bold whitespace-nowrap p-1">{{ item.title }}</div>

                      <div v-for="subItem in item.items">
                        <NuxtLink :href="localePath(subItem.href)" class="whitespace-nowrap p-1 block">{{ subItem.title }}</NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-[260px] flex justify-end">
            <NuxtLink
              v-if="page.button"
              :href="page.button.href"
              :class="'mr-2 ml-2 pointer-events-auto button button-sm' + (page.button.style ? ` button-${page.button.style}` : '')"
            >
              {{ page.button.title }}
            </NuxtLink>

            <select @change="switchLocale($event)" name="locales" class="mr-2 ml-2 cursor-pointer">
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

<style scoped lang="scss">
.header-menu-block {
  &:hover {
    .header-menu-items {
      display: flex;
    }

    &::after {
      border-bottom: 11px solid var(--color-white);
      border-left: 11px solid rgba(0, 0, 0, 0);
      border-right: 11px solid rgba(0, 0, 0, 0);
      content: "";
      display: inline-block;
      left: auto;
      position: absolute;
      left: 45%;
      top: 44px;
    }
  }
}

.header-menu-items {
  display: none;
  box-shadow: 0 1px 0 1px rgba(155, 155, 155, 0.1);
}
</style>
